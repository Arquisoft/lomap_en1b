import express, {Request, Response, Router} from "express";
import reviewsService from "../services/reviewsService";
import {getSessionFromStorage} from "@inrupt/solid-client-authn-node";
import {InvalidRequestBodyError, PodProviderError} from "../services/util/customErrors";

const reviewsRouter: Router = express.Router();

    reviewsRouter.get("/:locationID", async (req:Request, res:Response)=> {
        console.log("Review router: get")
        const session = await getSessionFromStorage(req.session.solidSessionId!);
        if(session==undefined) return res.status(401).send("Invalid access.");

        try {
            const locationID:string = req.params.locationID;
            console.log(req.params.locationID)
            console.log(locationID)
            return res.send(await reviewsService.getReviewsForLocation(locationID));
        } catch (error:any){
            if(error instanceof InvalidRequestBodyError){
                return res.status(400).send(error.message);
            } else if(error instanceof PodProviderError){
                return res.status(503).send(error.message);
            }
            return  res.status(500).send("Internal server error.");
        }
    });

    reviewsRouter.post("/", async (req, res)=>{
        const session = await getSessionFromStorage(req.session.solidSessionId!);
        if(session==undefined) return res.status(401).send("Invalid access.");

        try {
            return res.send(reviewsService.addReview(await req.body.review, session));
        } catch (error:any){
            if(error instanceof InvalidRequestBodyError){
                return res.status(400).send(error.message);
            } else if(error instanceof PodProviderError){
                return res.status(503).send(error.message);
            }
            return  res.status(500).send("Internal server error.");
        }
    });

    reviewsRouter.delete("/", reviewsService.deleteReview);

export default reviewsRouter;