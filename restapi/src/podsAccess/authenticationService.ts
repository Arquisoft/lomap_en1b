import {getSessionFromStorage, Session} from "@inrupt/solid-client-authn-node";
import {Request, Response} from "express";

export default {
    initLogin : async function (req:Request, res:Response){
        // create a new Session
        const session = new Session();
        req.session!.id = session.info.sessionId;

        //Redirect user to POD provider login
        const redirectToSolidIdentityProvider = (providerURL : string) => {
            res.status(200).json(providerURL);
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
        try{
            await session!.handleIncomingRedirect(`http://localhost:3000/auth${req.url}`);
        }catch (e){
            console.log(e)
            return res.sendStatus(500)
        }



        // Session now contains an authenticated Session instance.
        if (session!.info.isLoggedIn) {
            return res.sendStatus(200);
        }
        return res.sendStatus(401)
    },

    redirectConfirm : async function (req:Request, res:Response){
        res.redirect(`http://localhost:3000/auth${req.url}`);
    },

    logout : async function(req:Request, res : Response){
        const session = await getSessionFromStorage(req.session!.id);
        await session!.logout();
        res.send('Logged out');
    }
}