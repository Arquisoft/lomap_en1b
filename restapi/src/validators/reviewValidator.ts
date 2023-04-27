import {Review} from "../types";

export function validateReview(review:Review) : boolean{
    return review.score !== undefined
        && review.score !== null
        && review.score <= 5;
}