import {
    getPodUrlAll,
    getThingAll,
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

export default {

    saveLocation: async function (location:Location, session:Session){
        if(!validateLocation(location)) throw new InvalidRequestBodyError("Not valid location.")

        let locationsURL = await getLocationsURL(session.info.webId);
        if(locationsURL == undefined) throw new PodProviderError("Unable to get the locations dataset URL.")

        let locationsDataset = await getOrCreateDataset(locationsURL, session);
        if(locationsDataset == undefined) throw new PodProviderError("Unable to get the locations dataset.")
        locationsDataset = locationsDataset!

        const locationThing = locationToThing(location)
        locationsDataset = setThing(locationsDataset, locationThing);

        await Promise.all([
            saveSolidDatasetAt(
                locationsURL,
                locationsDataset,
                {fetch: session.fetch}),
            MongoService.addLocation(location, session.info.webId!)
        ])

        return locationThing.url
    },

    getLocations: async function(session:Session){
        let locationsURL = await getLocationsURL(session.info.webId);
        if(locationsURL == undefined) throw new PodProviderError("Unable to get the locations dataset URL.")

        let locationsDataset = await getOrCreateDataset(locationsURL, session);
        if(locationsDataset == undefined) throw new PodProviderError("Unable to get the locations dataset.")
        locationsDataset = locationsDataset!

        return getThingAll(locationsDataset)
                .filter(locationThing=>validateLocationThing(locationThing))
                .map(locationThing=>thingToLocation(locationThing))
                .concat(await MongoService.getLocationsSharedWithUser(session.info.webId!))
    },

}

async function getLocationsURL(webId: string | undefined){
    if(webId == undefined) return undefined
    let webID = decodeURIComponent(webId)
    const podURL = await getPodUrlAll(webID);
    return  podURL + "private/lomap/reviews";
}