import {Request, Response} from "express";
import {
    setThing,
    saveSolidDatasetAt,
    getPodUrlAll,
    getThingAll,
    getThing,
    Thing,
    getUrlAll,
    getWebIdDataset
} from "@inrupt/solid-client";
import {Session} from "@inrupt/solid-client-authn-node";
import {friendToThing, thingToFriend, urlToFriend} from "../builders/friendBuilder";
import {validateFriend, validateFriendThing} from "../validators/friendValidator";
import {Friend} from "../types";
import {FOAF} from "@inrupt/vocab-common-rdf";
import {getOrCreateDataset} from "./util/podAccessUtil";
import {InvalidRequestBodyError, PodProviderError} from "./util/customErrors";
import MongoService from "./MongoService"

export default {

    getFriends : async function (session:Session){
        let friendsURL = await getFriendsURL(session.info.webId);
        if(friendsURL == undefined) throw new PodProviderError("Unable to get the contacts dataset URL.")

        //Get friends from contacts
        let friendsDataset = await getOrCreateDataset(friendsURL, session)
        if(friendsDataset == undefined) throw new PodProviderError("Unable to get the contacts dataset.")
        friendsDataset = friendsDataset!

        //Get friends from profile
        const profile = await getWebIdDataset(decodeURIComponent(session.info.webId!));
        const profileThing = getThing(profile, decodeURIComponent(session.info.webId!));
        const profileFriends = getUrlAll(profileThing as Thing, FOAF.knows);

        //Get friends from extended profile
        //TODO

        return await Promise.all(
            getThingAll(friendsDataset)
                .filter(friendThing=>validateFriendThing(friendThing))
                .map(async friendThing=>await thingToFriend(friendThing, true))
                .concat(
                    profileFriends.map(async webId =>await urlToFriend(webId, false)))
            )
    },

    addFriend : async function (friend:Friend, session:Session){

        if(!validateFriend(friend)) throw new InvalidRequestBodyError("Not valid friendship.");
        let friendsURL = await getFriendsURL(session.info.webId);
        if(friendsURL == undefined) throw new PodProviderError("Unable to get the contacts dataset URL.");

        let friendsDataset = await getOrCreateDataset(friendsURL, session);
        if(friendsDataset == undefined) throw new PodProviderError("Unable to get the contacts dataset.");
        friendsDataset = friendsDataset!;

        const friendThing = friendToThing(friend);
        friendsDataset = setThing(friendsDataset, friendThing);

        await Promise.all([
            saveSolidDatasetAt(
                friendsURL,
                friendsDataset,
                {fetch: session.fetch}
            ),
            MongoService.addFriend(friend.webId , session.info.webId!)
        ])

        return friendThing.url;
    },

    deleteFriend : async function(_req:Request, _res:Response){
    }

}

async function getFriendsURL(webId:string | undefined){
    if(webId == undefined) return undefined
    let webID = decodeURIComponent(webId)
    const podURL = await getPodUrlAll(webID);
    return  podURL + "contacts/friends";
}