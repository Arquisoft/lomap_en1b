import {Request, Response} from "express";
import {getSessionFromStorage} from "@inrupt/solid-client-authn-node";
import {Review} from "../types";
import {
    createSolidDataset,
    getPodUrlAll,
    getSolidDataset,
    getThingAll,
    saveFileInContainer,
    saveSolidDatasetAt,
    setThing
} from "@inrupt/solid-client";
import {validateReview, validateReviewThing} from "../validators/reviewValidator";
import {reviewToThing, thingToReview} from "../builders/reviewBuilder";

export default {

    addReview: async function (req:Request, res:Response){
        console.log("adding review")
        const session = await getSessionFromStorage(req.session.solidSessionId!)
        if(session==undefined){
            return res.send('error')
        }

        console.log("=================================")
        console.log("BODY")
        console.log("=================================")

        console.log((req.body))

        let review : Review = req.body.review;
        if(!validateReview(review)){
            res.send('error')
        }

        let reviewsURL = await getReviewsURL(session.info.webId);
        if(reviewsURL == undefined) return res.send("error")

        let imagesURL = await getImagesURL(session.info.webId);
        if(imagesURL == undefined) return res.send("error")

        // Get or create reviews dataset
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

        console.log("=================================")
        console.log("REVIEW")
        console.log("=================================")

        console.log(review)

        //Read review.encodedPhoto, decode it and store it in review.photo
        //TODO
        const fetchResult = await fetch(review.encodedPhoto)
        if(fetchResult == null) return res.send("error")
        review.photo = await fetchResult.blob();

        console.log(review)

        const savedImage = await saveFileInContainer(imagesURL, review.photo, {fetch:session.fetch});

        const reviewThing = reviewToThing(review, session.info.webId!, savedImage.name)
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

        console.log("===============================================================")
        console.log("REVIEW DATASET:");
        console.log(reviewsDataset);
        console.log("===============================================================")


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

async function getImagesURL(webId: string | undefined){
    if(webId == undefined) return undefined
    let webID = decodeURIComponent(webId)
    const podURL = await getPodUrlAll(webID);
    return  podURL + "private/lomap/images";
}
