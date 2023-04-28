import {Review} from "../types";

export function validateReview(review:Review) : boolean{
    return review.score !== undefined
        && review.score !== null
        && review.score <= 5;
}

export function validateReview2(review:Review) : boolean{
    if(review == undefined
        || review.markerId == undefined){
        return false;
    }

    let filledFields = 0;

    if(review.comment !== null && review.comment !== undefined
        && review.comment.trim().length > 0){
        filledFields++;
    }
    //FIXME: I need to know how to check if a given photo is valid or not
    if(review.encodedPhoto !== null && review.encodedPhoto !== undefined ){
        filledFields++;
    }
    if(review.score !== null && review.score !== undefined
        && review.score > 0){
        filledFields++;
    }

    //To create a review you need at leats one of those fields with valid content
    return filledFields > 0;
}