const mongoose = require('mongoose');
const { model, Schema } = mongoose
//import {LocationType} from '../../locationType';

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

LocationSchema.methods.getSharedLocationsFromUsers = function getSharedLocationsFromUsers (users : [String]) {
    return this.model('Location').find({ owner: { $in: users } ,isShared: true });
}

LocationSchema.methods.removeSharedLocation = function removeSharedLocation(locationId: string) {
    this.model('Location').deleteOne({ id: locationId })
}

const Location = model('Location', LocationSchema)

export default Location;
