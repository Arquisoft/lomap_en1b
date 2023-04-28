const mongoose = require('mongoose');
const { model, Schema } = mongoose
const ReviewSchema = new Schema({
    stars : Number,
    comment : String,
    images : [String],
    owner : String,
    location : String
})

ReviewSchema.methods.getReviewsFromListOfLocation = function getReviewsFromListOfLocation(locations : [String]) {
    return this.model('Review').find({ location: {$in : locations} });
};

ReviewSchema.methods.getReviewsOfGivenUser = function getReviewsOfGivenUser(user : String) {
    return this.model('Review').find({ owner: user });
};

ReviewSchema.methods.isOwner = function isOwner (webId: String) {
    return this.owner.equals(webId);
};

const Review = model('Review', ReviewSchema)

export default  Review;