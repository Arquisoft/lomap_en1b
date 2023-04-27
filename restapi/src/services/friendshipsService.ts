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

export default {

    getFriends : async function (session:Session){
        let friendsURL = await getFriendsURL(session.info.webId);
        if(friendsURL == undefined) return "error"

        //Get friends from contacts
        let friendsDataset = await getOrCreateDataset(friendsURL, session)
        if(friendsDataset == undefined) return "error"
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
        if(!validateFriend(friend)) return 'error'

        let friendsURL = await getFriendsURL(session.info.webId);
        if(friendsURL == undefined) return "error"

        let friendsDataset = await getOrCreateDataset(friendsURL, session);
        if(friendsDataset == undefined) return "error"
        friendsDataset = friendsDataset!

        const friendThing = friendToThing(friend)
        friendsDataset = setThing(friendsDataset, friendThing);

        await saveSolidDatasetAt(
            friendsURL,
            friendsDataset,
            {fetch: session.fetch}
        );

        return "ok"
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