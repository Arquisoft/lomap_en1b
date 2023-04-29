import ReviewModel from './models/Review'
import {Review} from '../types';

export const ReviewRepository = {
    async createReview(review: Review) {
        const newReview = new ReviewModel({
            stars : review.score,
            comment : review.comment,
            location : review.markerId,
            images : review.encodedPhoto
        })

        newReview.save()
            .then((result: any) => {
                console.log(result);
            })
            .catch((err: any) => {
                console.log(err);
            })
    },

    async getReviewsFromListOfLocation(locations: [string]) {
        return ReviewModel.getReviewsFromListOfLocation(locations)
    },

    async getReviewsOfGivenUser(user : string) {
        return ReviewModel.getReviewsOfGivenUser(user)
    }
};