import {
    getPodUrlAll, getStringNoLocale, getThing,
    getThingAll, getWebIdDataset,
    saveSolidDatasetAt,
    setThing
} from "@inrupt/solid-client";
import {Location} from "../types";
import {Session} from "@inrupt/solid-client-authn-node";
import {locationToThing, thingToLocation} from "../builders/locationBuilder"
import {validateLocation, validateLocationThing} from "../validators/locationValidator";
import {getOrCreateDataset} from "./util/podAccessUtil";
import {InvalidRequestBodyError, PodProviderError} from "./util/customErrors";
import MongoService from "./MongoService"
import {FOAF} from "@inrupt/vocab-common-rdf";

export default {

    saveLocation: async function (location:Location, session:Session){
        if(!validateLocation(location)) throw new InvalidRequestBodyError("Not valid location.")
        location.owner = session.info.webId!

        let locationsURL = await getLocationsURL(session.info.webId);
        if(locationsURL == undefined) throw new PodProviderError("Unable to get the locations dataset URL.")

        let locationsDataset = await getOrCreateDataset(locationsURL, session);
        if(locationsDataset == undefined) throw new PodProviderError("Unable to get the locations dataset.")
        locationsDataset = locationsDataset!

        const locationThing = locationToThing(location)
        locationsDataset = setThing(locationsDataset, locationThing);

        //Extra review information for DB
        location.id = locationThing.url.split("/").pop()!
        const profile = await getWebIdDataset(session.info.webId!);
        const profileThing = getThing(profile, session.info.webId!)!;
        location.ownerName = getStringNoLocale(profileThing, FOAF.name)!

        await Promise.all([
            saveSolidDatasetAt(
                locationsURL,
                locationsDataset,
                {fetch: session.fetch}),
            MongoService.addLocation(location)
        ])

        return locationThing.url
    },

    getLocations: async function(session:Session){
        let locationsURL = await getLocationsURL(session.info.webId);
        if(locationsURL == undefined) throw new PodProviderError("Unable to get the locations dataset URL.")

        let locationsDataset = await getOrCreateDataset(locationsURL, session);
        if(locationsDataset == undefined) throw new PodProviderError("Unable to get the locations dataset.")
        locationsDataset = locationsDataset!

        // owner will always be the loged in user for locations in the pod, we get it here
        // to reduce the number of calls
        const profile = await getWebIdDataset(session.info.webId!);
        const profileThing = getThing(profile, session.info.webId!)!;
        const name = getStringNoLocale(profileThing, FOAF.name)!

        let locations = getThingAll(locationsDataset)
            .filter(locationThing => validateLocationThing(locationThing))
            .map(locationThing => thingToLocation(locationThing, name))
            .concat(await MongoService.getLocationsSharedWithUser(session.info.webId!))

        console.log("Locations(LocationsService.ts)")
        console.log(locations)
        console.log("Locations")
        return locations
    },

}

async function getLocationsURL(webId: string | undefined){
    if(webId == undefined) return undefined
    let webID = decodeURIComponent(webId)
    const podURL = await getPodUrlAll(webID);
    return  podURL + "private/lomap/reviews";
}