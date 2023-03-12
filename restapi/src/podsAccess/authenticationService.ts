import {getSessionFromStorage, Session} from "@inrupt/solid-client-authn-node";
import {Request, Response} from "express";

export default {
    initLogin : async function (req:Request, res:Response){
        // create a new Session
        const session = new Session();
        req.session.solidSessionId = session.info.sessionId;
        console.log(req.session.solidSessionId)

        //Redirect user to POD provider login
        const redirectToSolidIdentityProvider = (providerURL : string) => {
            res.redirect(providerURL)
        };
        // redirect handler will handle sending the user to their POD Provider.
        await session.login({
            // If login successfully, redirect here
            redirectUrl: 'http://localhost:8082/auth/loginconfirm',
            // Set user SOLID identity provider
            oidcIssuer: req.query.providerURL as string,
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
        console.log(req.session.solidSessionId)
        const session = await getSessionFromStorage(req.session.solidSessionId!);
        // Complete login process using the data appended by the Solid Identity Provider
        try{
            await session!.handleIncomingRedirect(`http://localhost:8082/auth${req.url}`);
        }catch (e){
            console.log(e)
            return res.sendStatus(500);
        }
        // Session now contains an authenticated Session instance.
        if (session!.info.isLoggedIn) {
            return res.redirect("http://localhost:3000/map")
        }
        return res.sendStatus(401)
    },


    logout : async function(req:Request, res : Response){
        const session = await getSessionFromStorage(req.session.solidSessionId!);
        await session!.logout();
        res.send('Logged out');
    },



    initTestLogin: async function(req:Request, res:Response){
        // create a new Session
        const session = new Session();
        req.session.solidSessionId = session.info.sessionId;
        console.log(req.session.solidSessionId)
        //Redirect user to POD provider login
        const redirectToSolidIdentityProvider = (providerURL : string) => {
            res.redirect(providerURL);
        };
        // redirect handler will handle sending the user to their POD Provider.
        await session.login({
            // If login successfully, redirect here
            redirectUrl: 'http://localhost:8082/auth/testloginconfirm',
            // Set user SOLID identity provider
            oidcIssuer: "https://login.inrupt.com",
            // Application name to show when requesting data
            clientName: "LoMap",
            //handler to redirect to the provider login
            handleRedirect: redirectToSolidIdentityProvider
        });
    },
    confirmTestLogin : async function (req:Request, res:Response){
        // If we get here, the user has logged in successfully
        // Recover session information
        console.log(req.session.solidSessionId)
        const session = await getSessionFromStorage(req.session.solidSessionId!);
        // Complete login process using the data appended by the Solid Identity Provider
        await session!.handleIncomingRedirect(`http://localhost:8082/auth${req.url}`);
        console.log(session?.info.webId)

        // Session now contains an authenticated Session instance.
        if (session!.info.isLoggedIn) {
            return res.redirect("http://localhost:3000")
        }

        return res.send("Not able to log in")
    },

}