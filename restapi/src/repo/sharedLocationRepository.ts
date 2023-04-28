import LocationModel from '../repo/models/Location'
import {Location} from '../types';

export const SharedLocationRepository = {
    async addSharedLocation(location: Location, ownerId: String) {
        const newLocation = new LocationModel({
            id: location.id,
            name: location.name,
            locationType: location.locationType,
            latitude: location.latitude,
            longitude: location.longitude,
            isShared: true,
            isOwnLocation: location.isOwnLocation,
            owner : ownerId

            //OJO para ver una review tienes que ser amigo de la persona que tiene la localizacvion
        })
        newLocation.save()
    },

    async removeSharedLocation(locationId: string) {
        LocationModel.removeSharedLocation(locationId)
    },

    async getSharedLocationFromUsers(users : [String]) {
        return LocationModel.getSharedLocationsFromUsers(users)
    },

};