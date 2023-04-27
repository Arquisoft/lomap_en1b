import {Request, Response} from "express";
import {Session} from "@inrupt/solid-client-authn-node";
import {Review} from "../types";
import {
    getPodUrlAll,
    getThingAll,
    saveSolidDatasetAt,
    setThing
} from "@inrupt/solid-client";
import {validateReview, validateReviewThing} from "../validators/reviewValidator";
import {reviewToThing, thingToReview} from "../builders/reviewBuilder";
import ImagesService from "./imagesService";
import {getOrCreateDataset} from "./util/podAccessUtil";

export default {

    addReview: async function (review:Review, session:Session){
        if(!validateReview(review)) return "error"

        let reviewsURL = await getReviewsURL(session.info.webId);
        if(reviewsURL == undefined) return "error"

        // Get or create reviews dataset
        let reviewsDataset = await getOrCreateDataset(reviewsURL, session);
        if(reviewsDataset == undefined) return "error"
        reviewsDataset = reviewsDataset!

        const imageURL = await ImagesService.saveImage(review.encodedPhoto, session);

        const reviewThing = reviewToThing(review, session.info.webId!, imageURL)
        reviewsDataset = setThing(reviewsDataset, reviewThing);

        await saveSolidDatasetAt(
            reviewsURL,
            reviewsDataset,
            {fetch: session.fetch}
        );

        return "ok"
    },

    getReviewsForLocation: async function(locationID:string){
        return locationID;
    },

    getUserReviews: async function (session:Session){
        let reviewsURL = await getReviewsURL(session.info.webId);
        if(reviewsURL == undefined) return "error"

        // Get or create reviews dataset
        let reviewsDataset = await getOrCreateDataset(reviewsURL, session);
        if(reviewsDataset == undefined) return "error"
        reviewsDataset = reviewsDataset!

        return getThingAll(reviewsDataset)
                .filter(reviewThing=>validateReviewThing(reviewThing))
                .map(reviewThing=>thingToReview(reviewThing, session.fetch))
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