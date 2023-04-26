const ReviewModel = require('../repo/schemas/Review')
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

    async getReviewsForGivenLocation(locationId: String) {
        //Todas las reviews para una localizacion, no se si hace
        // falta filtrar aqui el hecho de ser o no amigo, o si
        // se hace a nivel webapp

        ReviewModel.find({location : locationId})
            //@ts-ignore
            .then(reviews =>{
                return reviews;
            })
            //@ts-ignore
            .catch(err => {
                console.log(err);
            })
    }
    /*
    async deleteReview(review: any) {

    },
    async getReview(review: any) {

    },

     */


};