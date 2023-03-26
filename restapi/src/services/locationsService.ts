import {
    getPodUrlAll,
    getSolidDataset, getThingAll,
    saveSolidDatasetAt,
    setThing
} from "@inrupt/solid-client";
import {Location} from "../types";
import {Request, Response} from "express";
import {getSessionFromStorage} from "@inrupt/solid-client-authn-node";
import {buildTestLocationThing, locationToThing, thingToLocation} from "../builders/locationBuilder"
import {validateLocation, validateLocationThing} from "../validators/locationValidator";


export default {

    saveLocation: async function (req:Request, res:Response){
        const session = await getSessionFromStorage(req.session.solidSessionId!)
        if(session==undefined){
            return res.send('error')
        }

        let location : Location = req.body.location;
        if(!validateLocation(location)){
            res.send('error')
        }

        let locationsURL = await getLocationsURL(session.info.webId);
        if(locationsURL == undefined){
            return res.send("error")

        }

        let locationsSolidDataset = await getSolidDataset(
            locationsURL,
            {fetch: session.fetch}          // fetch from authenticated session
        );

        const locationThing = locationToThing(location)
        locationsSolidDataset = setThing(locationsSolidDataset, locationThing);

        let newDataset = await saveSolidDatasetAt(
            locationsURL,
            locationsSolidDataset,
            {fetch: session.fetch}             // fetch from authenticated Session
        );

        return res.send(getThingAll(newDataset).map(locationThing=>thingToLocation(locationThing)))
    },

    getOwnLocations: async function (req:Request, res:Response){
        const session = await getSessionFromStorage(req.session.solidSessionId!)
        if(session==undefined)return res.send('error')

        let locationsURL = await getLocationsURL(session.info.webId);
        if(locationsURL == undefined) return res.send("error")

        let locationsDataset =  await getSolidDataset(
            locationsURL,
            {fetch: session.fetch}          // fetch from authenticated session
        );

        return res.send(
            getThingAll(locationsDataset)
                .filter(locationThing=>validateLocationThing(locationThing))
                .map(locationThing=>thingToLocation(locationThing)))
    },

    saveTestLocation: async function (req:Request, res:Response){
        const session = await getSessionFromStorage(req.session.solidSessionId!)
        if(session==undefined) return res.send('error')
        let locationsURL = await getLocationsURL(session.info.webId);
        if(locationsURL == undefined) return res.send("error")
        const locationThing = buildTestLocationThing()
        let locationsSolidDataset = await getSolidDataset(
            locationsURL,
            {fetch: session.fetch}          // fetch from authenticated session
        );
        locationsSolidDataset = setThing(locationsSolidDataset, locationThing);
        let newDataset = await saveSolidDatasetAt(
            locationsURL,
            locationsSolidDataset,
            {fetch: session.fetch}             // fetch from authenticated Session
        );
        return res.send(getThingAll(newDataset).map(locationThing=>thingToLocation(locationThing)))
    }

}

async function getLocationsURL(webId: string | undefined){
    if(webId == undefined) return undefined
    let webID = decodeURIComponent(webId)
    const podURL = await getPodUrlAll(webID);
    console.log(podURL)
    return  podURL + "private/";
}