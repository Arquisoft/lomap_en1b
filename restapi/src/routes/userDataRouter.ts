import express, {Request, Response, Router} from "express";
import userDataService from "../services/userDataService";
import {getSessionFromStorage} from "@inrupt/solid-client-authn-node";
import {InvalidRequestBodyError, PodProviderError} from "../services/util/customErrors";

const userDataRouter: Router = express.Router();

userDataRouter.get("/", async (req:Request, res:Response)=> {
    const session = await getSessionFromStorage(req.session.solidSessionId!);
    if(session==undefined) return res.status(401).send("Invalid access.");

    try {
        return res.send(await userDataService.getProfileInfo(session));
    } catch (error:any){
        if(error instanceof InvalidRequestBodyError){
            return res.status(400).send(error.message);
        } else if(error instanceof PodProviderError){
            return res.status(503).send(error.message);
        }
        return  res.status(500).send("Internal server error.");
    }
});

export default userDataRouter;