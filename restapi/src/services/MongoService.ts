import {Review, Location} from "../types"
import {ReviewRepository} from "../repo/reviewRepository"
import {SharedLocationRepository} from "../repo/sharedLocationRepository"
import {SharedListRepository} from "../repo/sharedListRepository"

export default {

    createReview: async function (review : Review) {
        console.log("Creating review")
        ReviewRepository.createReview(review)
    },

    getReviews: async function (userWebId : String){
        //Obtain the list of friends of the user
        let users = await SharedListRepository.getSharedListFor(userWebId)
        //Add the user to the list
        users.concat(userWebId)
        //Obtain all those shared locations
        let locations = await SharedLocationRepository.getSharedLocationFromUsers(users)
        //Obtain the reviews of those locations
        let reviews = await ReviewRepository.getReviewsFromListOfLocation(locations)
        //return
        return reviews;
    },

    getLocationsSharedWithUser: async function (userWebId : String){
        //Obtain the list of friends of the user
        let users = await SharedListRepository.getSharedListFor(userWebId)
        //Obtain all those shared locations
        return SharedLocationRepository.getSharedLocationFromUsers(users)
    },

    addLocation: async function (newLocation : Location, userWebId : String){
        SharedLocationRepository.addSharedLocation(newLocation, userWebId)
    },

    removeLocation: async function (locationId : String){
        // @ts-ignore
        SharedLocationRepository.removeSharedLocation(locationId)
    },

    addFriend: async function (friendWebId : String , userWebId : String){
        // @ts-ignore
        SharedListRepository.addToSharedList(userWebId,friendWebId)
    }

}