import mongoose from 'mongoose'
import LocationSchema from './schemas/Location';
const { model } = mongoose
export const Location = model('Location', LocationSchema)
export const LocationRepository = {
    async createLocation(locationData: any) {
        const newLocation = new Location(locationData);
        await newLocation.save();
        return newLocation;
    },

    async getLocation(locationId: string) {
        const location = await Location.findById(locationId);
        return location;
    },

};