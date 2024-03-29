import {LocationModel} from '../repo/models/Location'
import {Location} from '../types';

export const SharedLocationRepository = {
    async addSharedLocation(location: Location) {
        const newLocation = new LocationModel({
            id: location.id,
            name: location.name,
            locationType: location.locationType,
            latitude: location.latitude,
            longitude: location.longitude,
            isShared: true,
            isOwnLocation: false,
            owner : location.owner,
            ownerName: location.ownerName
        })
        newLocation.save()
    },

    async removeSharedLocation(locationId: string) {
        LocationModel.removeSharedLocation(locationId)
    },

    async getSharedLocationFromUsers(users : [String]) {
        let sharedLocations = await LocationModel.getSharedLocationsFromUsers(users)

        if(sharedLocations === null || sharedLocations === 'undefined' || sharedLocations.length <= 0){
            return []
        }

        sharedLocations
            .map((location : Location) => ({
                id: location.id,
                name: location.name,
                locationType: location.locationType,
                latitude: location.latitude,
                longitude: location.longitude,
                isShared: true,
                isOwnLocation: false,
                owner : location.owner,
                ownerName: location.ownerName
            }))

        return sharedLocations
    },

};