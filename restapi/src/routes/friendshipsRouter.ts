import express, {Router, Request, Response} from "express";
import friendshipsService from "../services/friendshipsService";
import {getSessionFromStorage} from "@inrupt/solid-client-authn-node";
import {InvalidRequestBodyError, PodProviderError} from "../services/util/customErrors";

const friendshipsRouter: Router = express.Router();

    friendshipsRouter.get("/", async (req:Request, res:Response)=> {
        const session = await getSessionFromStorage(req.session.solidSessionId!);
        if(session==undefined) return res.status(401).send("Invalid access.");

        try {
            return res.status(200).send(await friendshipsService.getFriends(session));
        } catch (error:any){
            if(error instanceof InvalidRequestBodyError){
                return res.status(400).send(error.message);
            } else if(error instanceof PodProviderError){
                return res.status(503).send(error.message);
            }
            return  res.status(500).send("Internal server error.");
        }
    });

    friendshipsRouter.post("/", async (req:Request, res:Response)=> {
        const session = await getSessionFromStorage(req.session.solidSessionId!);
        if(session==undefined) return res.status(401).send("Invalid access.");

        try {
            return res.status(200).send(await friendshipsService.addFriend(req.body.friend, session));
        } catch (error:any){
            if (error instanceof InvalidRequestBodyError){
                return res.status(400).send(error.message);
            } else if(error instanceof PodProviderError){
                return res.status(503).send(error.message);
            }
            return  res.status(500).send("Internal server error.");
        }
    });

    friendshipsRouter.delete("/", friendshipsService.deleteFriend);

export default friendshipsRouter;