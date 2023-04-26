import {Review} from "../types";
import {Thing} from "@inrupt/solid-client";

export function validateReviewThing(_reviewThing:Thing) : boolean {
    return true;
}

export function validateReview(_review:Review) : boolean{
    if(_review == undefined || _review == null
        || _review.markerId == undefined || _review.markerId == null){
        return false;
    }
    var filledFields = 0;

    if(_review.comment !== null && _review.comment !== undefined
        && _review.comment.trim().length > 0){
        filledFields++;
    }
    //FIXME: I need to know how to check if a given photo is valid or not
    if(_review.photo !== null && _review.photo !== undefined ){
        filledFields++;
    }
    if(_review.score !== null && _review.score !== undefined
        && _review.score > 0){
        filledFields++;
    }

    //To create a review you need at leats one of those fields with valid content
    if( filledFields > 0){
        return true;
    }else{
        return false;
    }
}