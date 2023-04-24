import mongoose from 'mongoose'
import { LocationType } from '../../locationType';
const { Schema } = mongoose

const LocationSchema = new Schema({
    id: String,
    name: String,
    locationType: LocationType,
    latitude: Number,
    longitude: Number,
    isShared: Boolean,
    isOwnLocation: Boolean
    //owner
    //nuevo esquema ocn un id que puede ser
    // un ownerr y una lista de permitidos

    //OJO para ver una review tienes que ser amigo de la persona que tiene la localizacvion
})

export default  LocationSchema;