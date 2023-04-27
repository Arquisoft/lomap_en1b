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

LocationSchema.methods.setShared = function setShared (arg : boolean) {
    return this.isShared = arg;
};

LocationSchema.methods.getSharedLocationsFromUsers = function getSharedLocationsFromUsers (users : [String]) {
    return this.model('Location').find({ owner: { $in: users } ,isShared: true });
};

LocationSchema.methods.isOwner = function isOwner (webId: String) {
    return this.owner.equals(webId);
};

const Location = model('Location', LocationSchema)

export default Location;
