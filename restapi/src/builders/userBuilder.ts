import {UserData} from "../types";
import {
    getStringNoLocale, getThing,
    getWebIdDataset,
} from "@inrupt/solid-client";
import {FOAF} from "@inrupt/vocab-common-rdf";

export async function urlToUserData(webId:string): Promise<UserData>{
    const profile = await getWebIdDataset(webId);
    const profileThing = getThing(profile, webId)!;
    let name = getStringNoLocale(profileThing, FOAF.name)!
    name = (name == null) ? "Pod name not defined": name

    return {
        name:name,
        webId:webId,
    }
}