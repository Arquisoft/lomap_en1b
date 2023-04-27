import express, {Request, Response, Router} from "express";
import reviewsService from "../services/reviewsService";
import {getSessionFromStorage} from "@inrupt/solid-client-authn-node";

const reviewsRouter: Router = express.Router()

    reviewsRouter.get("/:locationID", async (req:Request, res:Response)=> {
        const session = await getSessionFromStorage(req.session.solidSessionId!)
        if(session==undefined)return res.send('error')

        const locationID:string = req.params.locationID;

        return res.send(reviewsService.getReviewsForLocation(locationID))
    });

    reviewsRouter.post("/", async (req, res)=>{
        const session = await getSessionFromStorage(req.session.solidSessionId!)
        if(session==undefined)return res.send('error')

        return res.send(reviewsService.addReview(req.body.review, session))
    });

    reviewsRouter.delete("/", reviewsService.deleteReview);

export default reviewsRouter