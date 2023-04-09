import {Friend} from "../types";
import {buildThing, createThing, getStringNoLocale, getUrl, Thing} from "@inrupt/solid-client";
import {FOAF, RDF, RDFS} from "@inrupt/vocab-common-rdf";

export function thingToFriend(friendThing:Thing): Friend {
    return {
        nickName: getStringNoLocale(friendThing, FOAF.nick)!,
        webId: getUrl(friendThing, RDFS.seeAlso)!,
        loMapOnly: true,
        name: "test",
        profilePic: ""
    }
}

export function friendToThing(friend:Friend): Thing{
    //Check how to work with knows
    //TODO
    return buildThing(createThing({name:friend.webId}))
        .addStringNoLocale(FOAF.nick, friend.nickName)
        .addUrl(RDFS.seeAlso, friend.webId)
        .addUrl(RDF.type, "http://xmlns.com/foaf/0.1/#term_Person")
        .build()
}