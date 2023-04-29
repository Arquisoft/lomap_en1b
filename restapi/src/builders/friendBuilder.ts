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
    return urlToFriend(webId, loMapFriend);
}

export async function urlToFriend(webId:string, loMapFriend:boolean): Promise<Friend>{
    const profile = await getWebIdDataset(webId);
    const profileThing = getThing(profile, webId)!;
    const name = getStringNoLocale(profileThing, FOAF.name)!

    const nickName = ""
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
    let aux = buildThing(createThing({name:friend.webId}))
    console.log("1")
    aux = aux.addStringNoLocale(FOAF.nick, friend.nickName)
    console.log("2")
    aux = aux.addUrl(RDFS.seeAlso, friend.webId)
    console.log("3")
    //aux = aux.addBoolean("loMapOnly", true)
    console.log("4")
    aux = aux.addUrl(RDF.type, "http://xmlns.com/foaf/0.1/#term_Person")
    console.log("5")
    return aux.build()
}