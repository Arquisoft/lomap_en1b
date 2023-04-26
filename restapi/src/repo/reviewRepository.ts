import mongoose from 'mongoose'
import ReviewSchema from "./schemas/Review"

const { model } = mongoose
export const Review = model('Review', ReviewSchema)
export const ReviewRepository = {
    async createReview(review: any) {
        const newReview = new Review(review);
        await newReview.save();
        return newReview;
    },

};