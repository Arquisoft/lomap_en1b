import {Friend} from "../types";
import {getStringNoLocale, getUrl, Thing} from "@inrupt/solid-client";
import {FOAF, RDFS} from "@inrupt/vocab-common-rdf";
import {isEmpty} from "./util/validationUtils";

export function validateFriendThing(friendThing:Thing) : boolean {
    return !isEmpty(getStringNoLocale(friendThing, FOAF.nick))
        && !isEmpty(getUrl(friendThing, RDFS.seeAlso))
}

export function validateFriend(friend:Friend) : boolean{
    return friend !==undefined
        && friend !== null
        && !isEmpty(friend.nickName)
        && !isEmpty(friend.webId)
}