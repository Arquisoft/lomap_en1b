import express, {Router, Response, Request} from 'express'
import locationsService from "../services/locationsService";
import {getSessionFromStorage} from "@inrupt/solid-client-authn-node";

const locationsRouter: Router = express.Router()

    locationsRouter.get("/", async (req:Request, res:Response) => {
        const session = await getSessionFromStorage(req.session.solidSessionId!)
        if(session==undefined) return res.send('error')

        const locations= await locationsService.getLocations(session)
        return res.send(locations);
    });

    locationsRouter.post("/", async (req:Request, res:Response)=> {
        const session = await getSessionFromStorage(req.session.solidSessionId!)
        if(session==undefined){
            return res.send('error')
        }
        return res.send(locationsService.saveLocation(req.body.location, session))
    });

export default locationsRouter