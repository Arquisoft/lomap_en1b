import {Request, Response} from "express";
import {
    setThing,
    saveSolidDatasetAt,
    getPodUrlAll,
    getSolidDataset,
    getThingAll,
    createSolidDataset,
    getThing,
    Thing,
    getUrlAll,
    getWebIdDataset
} from "@inrupt/solid-client";
import {getSessionFromStorage} from "@inrupt/solid-client-authn-node";
import {friendToThing, thingToFriend, urlToFriend} from "../builders/friendBuilder";
import {validateFriend, validateFriendThing} from "../validators/friendValidator";
import {Friend} from "../types";
import {FOAF} from "@inrupt/vocab-common-rdf";

export default {

    getFriends : async function (req:Request, res:Response){
        const session = await getSessionFromStorage(req.session.solidSessionId!);
        if(session==undefined)return res.send('error')

        let friendsURL = await getFriendsURL(session.info.webId);
        if(friendsURL == undefined) return res.send("error");

        //Get friends from contacts
        let friendsDataset;
        try{
            friendsDataset =  await getSolidDataset(
                friendsURL,
                {fetch: session.fetch}          // fetch from authenticated session
            );
        } catch (error:any) {
            if(typeof error.statusCode === "number" && error.statusCode === 404){
                friendsDataset = createSolidDataset();
            } else {
                return res.send("error")
            }
        }

        //Get friends from profile
        const profile = await getWebIdDataset(decodeURIComponent(session.info.webId!));
        const profileThing = getThing(profile, decodeURIComponent(session.info.webId!));
        const profileFriends = getUrlAll(profileThing as Thing, FOAF.knows);

        //Get friends from extended profile
        //TODO

        return res.send(await Promise.all(
            getThingAll(friendsDataset)
                .filter(friendThing=>validateFriendThing(friendThing))
                .map(async friendThing=>await thingToFriend(friendThing, true))
                .concat(
                    profileFriends.map(async webId =>await urlToFriend(webId, false)))
            ))

    },

    addFriend : async function (req:Request, res:Response){
        console.log("addFriend")
        const session = await getSessionFromStorage(req.session.solidSessionId!)
        if(session==undefined) return res.send('error')

        let friend: Friend = req.body.friend;
        if(!validateFriend(friend)){
            res.send('error')
        }

        let friendsURL = await getFriendsURL(session.info.webId);
        if(friendsURL == undefined) return res.send("error")

        let friendsDataset;
        try{
            friendsDataset =  await getSolidDataset(
                friendsURL,
                {fetch: session.fetch}          // fetch from authenticated session
            );
        } catch (error:any) {
            if(typeof error.statusCode === "number" && error.statusCode === 404){
                friendsDataset = createSolidDataset();
            } else {
                return res.send("error")
            }
        }

        const friendThing = friendToThing(friend)
        friendsDataset = setThing(friendsDataset, friendThing);

        let newDataset = await saveSolidDatasetAt(
            friendsURL,
            friendsDataset,
            {fetch: session.fetch}             // fetch from authenticated Session
        );

        return res.send(getThingAll(newDataset).map(locationThing=>thingToFriend(locationThing, true)))
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