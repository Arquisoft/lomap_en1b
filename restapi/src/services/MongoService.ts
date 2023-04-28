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
        let users = await SharedListRepository.getSharedListFor(userWebId)
        //Obtain all those shared locations
        return await SharedLocationRepository.getSharedLocationFromUsers(users)
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