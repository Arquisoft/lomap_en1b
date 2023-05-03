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
    const nick = getStringNoLocale(friendThing, FOAF.nick)
    return urlToFriend(webId, loMapFriend, nick!);
}

export async function urlToFriend(webId:string, loMapFriend:boolean, nick:string): Promise<Friend>{
    const profile = await getWebIdDataset(webId);
    const profileThing = getThing(profile, webId)!;

    let name = getStringNoLocale(profileThing, FOAF.name)!
    name = name = (name == null || name == 'undefined' || name.trim().length <= 0)
        ? "No name"
        : name

    const profilePic = ""

    return {
        name:name,
        webId:webId,
        nickName:nick,
        profilePic:profilePic,
        loMapOnly:loMapFriend
    }
}

export function friendToThing(friend:Friend): Thing{
    let aux = buildThing(createThing({name:friend.webId}))
    aux = aux.addStringNoLocale(FOAF.nick, friend.nickName)
    aux = aux.addUrl(RDFS.seeAlso, friend.webId)
    //aux = aux.addBoolean("loMapOnly", true)
    aux = aux.addUrl(RDF.type, "http://xmlns.com/foaf/0.1/#term_Person")
    return aux.build()
}