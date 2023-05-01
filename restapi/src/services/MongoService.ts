import {Review, Location} from "../types"
import {ReviewRepository} from "../repo/reviewRepository"
import {SharedLocationRepository} from "../repo/sharedLocationRepository"
import {SharedListRepository} from "../repo/sharedListRepository"

export default {

    createReview: async function (review : Review) {
        await ReviewRepository.createReview(review)
    },

    getReviews: async function (locationID : string){
        //Obtain only the reviews of the given location
        return await ReviewRepository.getReviewsFromListOfLocation([locationID])
    },

    getLocationsSharedWithUser: async function (userWebId : string){
        //Obtain the list of friends of the user
        console.log("UserWebId")
        console.log(userWebId)
        console.log("UserWebId")
        let users = await SharedListRepository.getSharedListFor(userWebId)
        console.log("Users(MongoService.ts)")
        console.log(users)
        console.log("Users")
        //Obtain all those shared locations
        let sharedLocations  = await SharedLocationRepository.getSharedLocationFromUsers(users)
        console.log("Shared locations(MongoService.ts)")
        console.log(sharedLocations)
        console.log("Shared locations")
        return sharedLocations
    },

    addLocation: async function (newLocation : Location, userWebId : string){
        if(newLocation.isShared) await SharedLocationRepository.addSharedLocation(newLocation, userWebId)
    },

    removeLocation: async function (locationId : string){
        await SharedLocationRepository.removeSharedLocation(locationId)
    },

    addFriend: async function (friendWebId : string , userWebId : string){
        await SharedListRepository.addToSharedList(userWebId,friendWebId)
    }

}