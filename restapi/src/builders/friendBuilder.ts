import {Friend} from "../types";
import {buildThing, createThing, getStringNoLocale, getUrl, Thing} from "@inrupt/solid-client";
import {FOAF, RDF, RDFS} from "@inrupt/vocab-common-rdf";

export function thingToFriend(friendThing:Thing): Friend {
    return {
        podId: getStringNoLocale(friendThing, FOAF.nick)!,
        username: getUrl(friendThing, RDFS.seeAlso)!,
    }
}

export function friendToThing(friend:Friend): Thing{
    //Check how to work with knows
    //TODO
    return buildThing(createThing({name:friend.podId}))
        .addStringNoLocale(FOAF.nick, friend.username)
        .addUrl(RDFS.seeAlso, friend.podId)
        .addUrl(RDF.type, "http://xmlns.com/foaf/0.1/#term_Person")
        .build()
}