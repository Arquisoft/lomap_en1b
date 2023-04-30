const mongoose = require('mongoose');
const { model, Schema } = mongoose
const ReviewSchema = new Schema({
    score : Number,
    comment : String,
    images : [String],
    owner : String,
    location : String
})

ReviewSchema.statics.getReviewsFromListOfLocation = function(locations : [String]): Promise<string[]> {
    return this.find({ location: locations })
        //@ts-ignore
        .then(result => {

            if (result === null || result.length <= 0) {
                return [] as string[];
            } else {
                return result;
            }
        })
        //@ts-ignore
        .catch(err => {
            console.log(err);
        });
};

ReviewSchema.statics.getReviewsOfGivenUser = function(user : String): Promise<string[]> {
    return this.find({ owner: user })
        //@ts-ignore
        .then(result => {

            if (result === null || result.length <= 0) {
                return [] as string[];
            } else {
                return JSON.stringify(result);
            }
        })
        //@ts-ignore
        .catch(err => {
            console.log(err);
        });
};

ReviewSchema.methods.isOwner = function(webId: String): Promise<boolean> {
    return this.owner.equals(webId);
};

export const ReviewModel = model('Review', ReviewSchema)

