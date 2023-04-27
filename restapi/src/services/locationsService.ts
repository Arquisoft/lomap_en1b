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


export default {

    saveLocation: async function (location:Location, session:Session){
        if(!validateLocation(location)) return "error"

        let locationsURL = await getLocationsURL(session.info.webId);
        if(locationsURL == undefined) return "error"

        let locationsDataset = await getOrCreateDataset(locationsURL, session);
        if(locationsDataset == undefined) return "error"
        locationsDataset = locationsDataset!

        const locationThing = locationToThing(location)
        locationsDataset = setThing(locationsDataset, locationThing);

        await saveSolidDatasetAt(
            locationsURL,
            locationsDataset,
            {fetch: session.fetch}
        );

        return "ok"
    },

    getLocations: async function(session:Session){
        let locationsURL = await getLocationsURL(session.info.webId);
        if(locationsURL == undefined) return "error"

        let locationsDataset = await getOrCreateDataset(locationsURL, session);
        if(locationsDataset == undefined) return "error"
        locationsDataset = locationsDataset!

        return getThingAll(locationsDataset)
                .filter(locationThing=>validateLocationThing(locationThing))
                .map(locationThing=>thingToLocation(locationThing));
    },

}

async function getLocationsURL(webId: string | undefined){
    if(webId == undefined) return undefined
    let webID = decodeURIComponent(webId)
    const podURL = await getPodUrlAll(webID);
    return  podURL + "private/lomap/reviews";
}