import ReviewModel from './models/Review'
import {Review} from '../types';

export const ReviewRepository = {
    async createReview(review: Review) {
        const newReview = new ReviewModel({
            stars : review.score,
            comment : review.comment,
            location : review.markerId,
            //FIXME: Podemos pasar varias
            images : review.photo
        })

        newReview.save()
            //@ts-ignore
            .then(result => {
                console.log(result);
            })
            //@ts-ignore
            .catch(err => {
                console.log(err);
            })
    },

    async getReviewsFromListOfLocation(locations: [String]) {
        return ReviewModel.getReviewsFromListOfLocation(locations)
    },

    async getReviewsOfGivenUser(user : String) {
        return ReviewModel.getReviewsOfGivenUser(user)
    }
};