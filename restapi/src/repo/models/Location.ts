const { model, Schema } = mongoose
const {LocationType} = require('../../types');
const LocationSchema = new Schema({
    id: String,
    name: String,
    locationType: LocationType,
    latitude: Number,
    longitude: Number,
    isShared: Boolean,
    isOwnLocation: Boolean,
    owner : String

    //OJO para ver una review tienes que ser amigo de la persona que tiene la localizacvion
})

LocationSchema.methods.getSharedLocationsFromUsers = function getSharedLocationsFromUsers (users : [String]) {
    return this.model('Location').find({ owner: { $in: users } ,isShared: true });
};

LocationSchema.methods.removeSharedLocation = function removeSharedLocation(locationId: string) {
    this.model('Location').deleteOne({ id: locationId })
};

const Location = model('Location', LocationSchema)

export default Location;
