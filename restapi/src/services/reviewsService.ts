import {Request, Response} from "express";
import {getSessionFromStorage} from "@inrupt/solid-client-authn-node";
import {Review} from "../types";
import {
    createSolidDataset,
    getPodUrlAll,
    getSolidDataset,
    getThingAll,
    saveSolidDatasetAt,
    setThing
} from "@inrupt/solid-client";
import {validateReview, validateReviewThing} from "../validators/reviewValidator";
import {reviewToThing, thingToReview} from "../builders/reviewBuilder";
import ImagesService from "./imagesService";
import {getOrCreateDataset} from "./util/podAccessUtil";

export default {

    addReview: async function (req:Request, res:Response){
        const session = await getSessionFromStorage(req.session.solidSessionId!)
        if(session==undefined){
            return res.send('error')
        }

        let review : Review = req.body.review;
        if(!validateReview(review)){
            res.send('error')
        }

        let reviewsURL = await getReviewsURL(session.info.webId);
        if(reviewsURL == undefined) return res.send("error")

        // Get or create reviews dataset
        let reviewsDataset = await getOrCreateDataset(reviewsURL, session);
        if(reviewsDataset == undefined) return res.send("error")
        reviewsDataset = reviewsDataset!

        const imageURL = await ImagesService.saveImage(req);

        const reviewThing = reviewToThing(review, session.info.webId!, imageURL)
        reviewsDataset = setThing(reviewsDataset, reviewThing);

        let newDataset = await saveSolidDatasetAt(
            reviewsURL,
            reviewsDataset,
            {fetch: session.fetch}             // fetch from authenticated Session
        );

        return res.send(getThingAll(newDataset).map(locationThing=>thingToReview(locationThing, session.fetch)))

    },

    getUserReviews: async function (req:Request, res:Response){

        const session = await getSessionFromStorage(req.session.solidSessionId!)
        if(session==undefined)return res.send('error')
        let reviewsURL = await getReviewsURL(session.info.webId);
        if(reviewsURL == undefined) return res.send("error")

        console.log("[LOCATION_ID: "+req.params.locationID+"]");

        let reviewsDataset;
        try{
            reviewsDataset =  await getSolidDataset(
                reviewsURL,
                {fetch: session.fetch}          // fetch from authenticated session
            );
        } catch (error:any) {
            if(typeof error.statusCode === "number" && error.statusCode === 404){
                reviewsDataset = createSolidDataset();
            } else {
                return res.send("error")
            }
        }

        return res.send(
            getThingAll(reviewsDataset)
                .filter(reviewThing=>validateReviewThing(reviewThing))
                .map(reviewThing=>thingToReview(reviewThing, session.fetch)))
    },

    deleteReview: async function (_req:Request, _res:Response){

    }

}

async function getReviewsURL(webId: string | undefined){
    if(webId == undefined) return undefined
    let webID = decodeURIComponent(webId)
    const podURL = await getPodUrlAll(webID);
    return  podURL + "private/lomap/reviews";
}