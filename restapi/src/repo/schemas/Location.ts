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
    owner : String //El webID de la persona que crea esa localizacion

    //OJO para ver una review tienes que ser amigo de la persona que tiene la localizacvion
})

const Location = model('Location', LocationSchema)

export default Location;
