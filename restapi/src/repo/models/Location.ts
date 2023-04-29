const mongoose = require('mongoose');
const { model, Schema } = mongoose

const LocationSchema = new Schema({
    id: String,
    name: String,
    locationType: String,
    latitude: Number,
    longitude: Number,
    isShared: Boolean,
    isOwnLocation: Boolean,
    owner : String
})

LocationSchema.statics.getSharedLocationsFromUsers = function(users : [string]): Promise<string[]> {
    return this.find({owner: {$in: users}, isShared: true})
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

LocationSchema.methods.removeSharedLocation = function(locationId: string) {
    this.deleteOne({ id: locationId })
}

export const LocationModel = model('Location', LocationSchema)
