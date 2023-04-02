import {Request, Response} from "express";
import {getSessionFromStorage} from "@inrupt/solid-client-authn-node";
import {Review} from "../types";
import {getPodUrlAll, getSolidDataset, getThingAll, saveSolidDatasetAt, setThing} from "@inrupt/solid-client";
import {validateReview, validateReviewThing} from "../validators/reviewValidator";
import {reviewToThing, thingToReview} from "../builders/reviewBuilder";


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
        if(reviewsURL == undefined){
            return res.send("error")

        }

        let reviewsSolidDataset = await getSolidDataset(
            reviewsURL,
            {fetch: session.fetch}          // fetch from authenticated session
        );

        const reviewThing = reviewToThing(review)
        reviewsSolidDataset = setThing(reviewsSolidDataset, reviewThing);

        let newDataset = await saveSolidDatasetAt(
            reviewsURL,
            reviewsSolidDataset,
            {fetch: session.fetch}             // fetch from authenticated Session
        );

        return res.send(getThingAll(newDataset).map(locationThing=>thingToReview(locationThing)))

    },

    getReviews: async function (req:Request, res:Response){
        const session = await getSessionFromStorage(req.session.solidSessionId!)
        if(session==undefined)return res.send('error')

        let locationsURL = await getReviewsURL(session.info.webId);
        if(locationsURL == undefined) return res.send("error")

        let reviewDataset =  await getSolidDataset(
            locationsURL,
            {fetch: session.fetch}          // fetch from authenticated session
        );

        return res.send(
            getThingAll(reviewDataset)
                .filter(reviewThing=>validateReviewThing(reviewThing))
                .map(reviewThing=>thingToReview(reviewThing)))
    },

    deleteReview: async function (_req:Request, _res:Response){

    }

}

async function getReviewsURL(webId: string | undefined){
    if(webId == undefined) return undefined
    let webID = decodeURIComponent(webId)
    const podURL = await getPodUrlAll(webID);
    return  podURL + "private/";
}