import express, {Router, Response, Request} from 'express'
import locationsService from "../services/locationsService";
import {getSessionFromStorage} from "@inrupt/solid-client-authn-node";
import {InvalidRequestBodyError, PodProviderError} from "../services/util/customErrors";

const locationsRouter: Router = express.Router()

    locationsRouter.get("/", async (req:Request, res:Response) => {
        const session = await getSessionFromStorage(req.session.solidSessionId!);
        if(session==undefined) return res.status(401).send("Invalid access.");

        try {
            return res.status(200).send(await locationsService.getLocations(session));
        } catch (error:any){
            if(error instanceof InvalidRequestBodyError){
                return res.status(400).send(error.message);
            } else if(error instanceof PodProviderError){
                return res.status(503).send(error.message);
            }
            return  res.status(500).send("Internal server error.");
        }
    });

    locationsRouter.post("/", async (req:Request, res:Response)=> {
        const session = await getSessionFromStorage(req.session.solidSessionId!);
        if(session==undefined) return res.status(401).send("Invalid access.");

        try {
            return res.send(locationsService.saveLocation(await req.body.location, session));
        } catch (error:any){
            if(error instanceof InvalidRequestBodyError){
                return res.status(400).send(error.message);
            } else if(error instanceof PodProviderError){
                return res.status(503).send(error.message);
            }
            return  res.status(500).send("Internal server error.");
        }
    });

export default locationsRouter;