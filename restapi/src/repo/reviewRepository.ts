import {ReviewModel} from './models/Review'
import {Review} from '../types';

export const ReviewRepository = {
    async createReview(review: Review) {
        const newReview = new ReviewModel({
            score : review.score,
            comment : review.comment,
            location : review.markerId,
            encodedPhoto : review.encodedPhoto,
            owner : review.owner,
            ownerName : review.ownerName
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
            encodedPhoto: review.encodedPhoto,
            owner: review.owner,
            ownerName: review.ownerName
        }))
        console.log("REVIEWS REPOSItORy")
        console.log(reviews)
        console.log("REVIEWS REPOSItORy")
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