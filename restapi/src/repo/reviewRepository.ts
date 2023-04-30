import {ReviewModel} from './models/Review'
import {Review} from '../types';

export const ReviewRepository = {
    async createReview(review: Review) {
        const newReview = new ReviewModel({
            score : review.score,
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
        let reviews = await ReviewModel.getReviewsFromListOfLocation(locations)

        if(reviews === null || reviews === 'undefined' || reviews.length <= 0){
            return []
        }

        reviews.map((review : Review) => ({
            markerId: review.markerId,
            comment: review.comment,
            score: review.score,
            encodedPhoto: review.encodedPhoto
        }))

        return reviews

    },

    async getReviewsOfGivenUser(user : string) {
        let reviews = await ReviewModel.getReviewsOfGivenUser(user)

        if(reviews === null || reviews === 'undefined' || reviews.length <= 0){
            return []
        }

        reviews.map((review : Review) => ({
                markerId: review.markerId,
                comment: review.comment,
                score: review.score,
                encodedPhoto: review.encodedPhoto
            }))

        return reviews
    }
};