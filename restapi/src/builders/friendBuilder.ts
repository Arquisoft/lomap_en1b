import {Friend} from "../types";
import {
    buildThing,
    createThing,
    getStringNoLocale, getThing,
    getUrl,
    getWebIdDataset,
    Thing
} from "@inrupt/solid-client";
import {FOAF, RDF, RDFS} from "@inrupt/vocab-common-rdf";

export async function thingToFriend(friendThing:Thing, loMapFriend:boolean): Promise<Friend> {
    const webId = getUrl(friendThing, RDFS.seeAlso)!

    const profile = await getWebIdDataset(webId);
    const profileThing = getThing(profile, webId)!;
    const name = getStringNoLocale(profileThing, FOAF.name)!

    const nickName = getStringNoLocale(friendThing, FOAF.nick)!
    const profilePic = ""

    return {
        name:name,
        webId:webId,
        nickName:nickName,
        profilePic:profilePic,
        loMapOnly:loMapFriend
    }
}

export function friendToThing(friend:Friend): Thing{
    return buildThing(createThing({name:friend.webId}))
        .addStringNoLocale(FOAF.nick, friend.nickName)
        .addUrl(RDFS.seeAlso, friend.webId)
        .addBoolean("loMapOnly", true)
        .addUrl(RDF.type, "http://xmlns.com/foaf/0.1/#term_Person")
        .build()
}