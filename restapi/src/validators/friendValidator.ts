import {Friend} from "../types";
import {getStringNoLocale, getUrl, Thing} from "@inrupt/solid-client";
import {FOAF, RDFS} from "@inrupt/vocab-common-rdf";

export function validateFriendThing(friendThing:Thing) : boolean {
    return getStringNoLocale(friendThing, FOAF.nick) !== undefined
        && getStringNoLocale(friendThing, FOAF.nick) !== null
        && getUrl(friendThing, RDFS.seeAlso) !== undefined
        && getUrl(friendThing, RDFS.seeAlso) !== null
}

export function validateFriend(friend:Friend) : boolean{
    return friend !==undefined
        && friend !== null
        && friend.nickName !== undefined
        && friend.nickName !== null
        && friend.webId !== undefined
        && friend.webId !== null
}