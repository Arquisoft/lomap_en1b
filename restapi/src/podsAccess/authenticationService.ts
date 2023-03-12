import {getSessionFromStorage, Session} from "@inrupt/solid-client-authn-node";
import {Request, Response} from "express";

export default {
    initLogin : async function (req:Request, res:Response){
        // create a new Session
        const session = new Session();
        req.session!.id = session.info.sessionId;

        //Redirect user to POD provider login
        const redirectToSolidIdentityProvider = (providerURL : string) => {
            res.send(providerURL);
        };

        // redirect handler will handle sending the user to their POD Provider.
        await session.login({
            // If login successfully, redirect here
            redirectUrl: 'http://localhost:3000/auth/loginconfirm',
            // Set user SOLID identity provider
            oidcIssuer: req.body.provider,
            //oidcIssuer: "https://login.inrupt.com",
            // Application name to show when requesting data
            clientName: "LoMap",
            //handler to redirect to the provider login
            handleRedirect: redirectToSolidIdentityProvider
        });
    },

    confirmLogin : async function (req:Request, res:Response){
        // If we get here, the user has logged in successfully
        // Recover session information
        const session = await getSessionFromStorage(req.session!.id);

        // Complete login process using the data appended by the Solid Identity Provider
        await session!.handleIncomingRedirect(`http://localhost:8082/auth${req.url}`);

        // Session now contains an authenticated Session instance.
        if (session!.info.isLoggedIn) {
            return res.send('Logged in with the WebID ' + session!.info.webId);
        }
        return undefined
    },

    logout : async function(req:Request, res : Response){
        const session = await getSessionFromStorage(req.session!.id);
        await session!.logout();
        res.send('Logged out');
    }
}