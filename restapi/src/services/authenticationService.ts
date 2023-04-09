import {getSessionFromStorage, Session} from "@inrupt/solid-client-authn-node";
import {Request, Response} from "express";

export default {
    initLogin : async function (req:Request, res:Response){
        // create a new Session
        const session = new Session();
        req.session.solidSessionId = session.info.sessionId;

        //Redirect user to POD provider login
        const redirectToSolidIdentityProvider = (providerURL : string) => {
            res.redirect(providerURL)
        };

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
        const session = await getSessionFromStorage(req.session.solidSessionId!);
        // Complete login process using the data appended by the Solid Identity Provider
        try{
            await session!.handleIncomingRedirect(`http://localhost:8082/auth${req.url}`);
        }catch (e){
            return res.sendStatus(500);
        }
        // Session now contains an authenticated Session instance.
        if (session!.info.isLoggedIn) {
            return res.redirect("http://localhost:3000/login/confirm")
        }
        return res.sendStatus(401)
    },


    logout : async function(req:Request, res : Response){
        const session = await getSessionFromStorage(req.session.solidSessionId!);
        await session!.logout();
        res.redirect("http://localhost:3000")
    },



    initTestLogin: async function(req:Request, res:Response){
        const session = new Session();
        req.session.solidSessionId = session.info.sessionId;
        const redirectToSolidIdentityProvider = (providerURL : string) => {
            res.redirect(providerURL);
        };
        await session.login({
            redirectUrl: 'http://localhost:8082/auth/testloginconfirm',
            oidcIssuer: "https://login.inrupt.com",
            clientName: "LoMap",
            handleRedirect: redirectToSolidIdentityProvider
        });
    },
    confirmTestLogin : async function (req:Request, res:Response){
        const session = await getSessionFromStorage(req.session.solidSessionId!);
        await session!.handleIncomingRedirect(`http://localhost:8082/auth${req.url}`);
        if (session!.info.isLoggedIn) {
            return res.redirect("http://localhost:3000")
        }
        return res.send("Not able to log in")
    },

}