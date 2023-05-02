import {Review} from "../types";
import {isEmpty} from "./util/validationUtils";

export function validateReview(review:Review) : boolean{
    if(review == undefined || isEmpty(review.markerId)){
        return false;
    }

    let filledFields = 0;

    if(!isEmpty(review.comment)){
        filledFields++;
    }

    if(!isEmpty(review.encodedPhoto)){
        filledFields++;
    }

    if(review.score !== null && review.score !== undefined
        && review.score > 0){
        if(review.score>5) return false
        filledFields++;
    }

    //To create a review you need at leats one of those fields with valid content
    return filledFields > 0;
}