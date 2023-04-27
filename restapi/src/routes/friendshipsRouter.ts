import express, {Router, Request, Response} from "express";
import friendshipsService from "../services/friendshipsService";
import {getSessionFromStorage} from "@inrupt/solid-client-authn-node";

const friendshipsRouter: Router = express.Router()

    friendshipsRouter.get("/", async (req:Request, res:Response)=> {
        const session = await getSessionFromStorage(req.session.solidSessionId!);
        if(session==undefined) return res.send('error')

        return friendshipsService.getFriends(session)
    });

    friendshipsRouter.post("/", async (req:Request, res:Response)=> {
        const session = await getSessionFromStorage(req.session.solidSessionId!);
        if(session==undefined) return res.send('error')

        return friendshipsService.addFriend(req.body.friend, session)
    });

    friendshipsRouter.delete("/", friendshipsService.deleteFriend)

export default friendshipsRouter