import {Request, Response} from "express";
import {Session} from "@inrupt/solid-client-authn-node";
import {Review} from "../types";
import {
    getPodUrlAll,
    getThingAll,
    saveSolidDatasetAt,
    setThing
} from "@inrupt/solid-client";
import {validateReview} from "../validators/reviewValidator";
import {reviewToThing} from "../builders/reviewBuilder";
import ImagesService from "./imagesService";
import {getOrCreateDataset} from "./util/podAccessUtil";
import {InvalidRequestBodyError, PodProviderError} from "./util/customErrors";
import MongoService from "./MongoService"

export default {

    getReviewsForLocation: async function(locationID:string){
        let reviews = await MongoService.getReviews(locationID);
        console.log("Reviews (ReviewService.ts)")
        console.log(reviews)
        console.log("Reviews (ReviewService.ts)")
        return reviews
    },

    //Only for testing
    getUserReviews: async function (session:Session){
        let reviewsURL = await getReviewsURL(session.info.webId);
        if(reviewsURL == undefined) throw new PodProviderError("Unable to get the reviews dataset URL.");

        let reviewsDataset = await getOrCreateDataset(reviewsURL, session);
        if(reviewsDataset == undefined) throw new PodProviderError("Unable to get the reviews dataset.");
        reviewsDataset = reviewsDataset!

        return getThingAll(reviewsDataset);
    },

    addReview: async function (review:Review, session:Session){
        if(!validateReview(review)) throw new InvalidRequestBodyError("Not valid review.");

        let reviewsURL = await getReviewsURL(session.info.webId);
        if(reviewsURL == undefined) throw new PodProviderError("Unable to get the reviews dataset URL.");

        let reviewsDataset = await getOrCreateDataset(reviewsURL, session);
        if(reviewsDataset == undefined) throw new PodProviderError("Unable to get the reviews dataset.");
        reviewsDataset = reviewsDataset!;

        const imageURL = await ImagesService.saveImage(review.encodedPhoto, session);

        review.owner = session.info.webId!

        const reviewThing = reviewToThing(review, session.info.webId!, imageURL);
        reviewsDataset = setThing(reviewsDataset, reviewThing);
        await Promise.all([
            saveSolidDatasetAt(
                reviewsURL,
                reviewsDataset,
                {fetch: session.fetch}
            ),
            MongoService.createReview(review)
        ])
        return reviewThing.url;
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