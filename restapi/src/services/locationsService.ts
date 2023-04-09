import {
    createSolidDataset,
    getPodUrlAll,
    getSolidDataset, getThingAll,
    saveSolidDatasetAt,
    setThing
} from "@inrupt/solid-client";
import {Location} from "../types";
import {Request, Response} from "express";
import {getSessionFromStorage} from "@inrupt/solid-client-authn-node";
import {locationToThing, thingToLocation} from "../builders/locationBuilder"
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

        let locationsDataset;
        try{
            locationsDataset =  await getSolidDataset(
                locationsURL,
                {fetch: session.fetch}          // fetch from authenticated session
            );
        } catch (error:any) {
            if(typeof error.statusCode === "number" && error.statusCode === 404){
                locationsDataset = createSolidDataset();
            } else {
                return res.send("error")
            }
        }

        const locationThing = locationToThing(location)
        locationsDataset = setThing(locationsDataset, locationThing);

        let newDataset = await saveSolidDatasetAt(
            locationsURL,
            locationsDataset,
            {fetch: session.fetch}             // fetch from authenticated Session
        );

        return res.send(getThingAll(newDataset).map(locationThing=>thingToLocation(locationThing)))
    },

    getOwnLocations: async function (req:Request, res:Response){
        const session = await getSessionFromStorage(req.session.solidSessionId!)
        if(session==undefined)return res.send('error')

        let locationsURL = await getLocationsURL(session.info.webId);
        if(locationsURL == undefined) return res.send("error")

        let locationsDataset;
        try{
            locationsDataset =  await getSolidDataset(
                locationsURL,
                {fetch: session.fetch}          // fetch from authenticated session
            );
        } catch (error:any) {
            if(typeof error.statusCode === "number" && error.statusCode === 404){
                locationsDataset = createSolidDataset();
            } else {
                return res.send("error")
            }
        }

        return res.send(
            getThingAll(locationsDataset)
                .filter(locationThing=>validateLocationThing(locationThing))
                .map(locationThing=>thingToLocation(locationThing)))
    },

}

async function getLocationsURL(webId: string | undefined){
    if(webId == undefined) return undefined
    let webID = decodeURIComponent(webId)
    const podURL = await getPodUrlAll(webID);
    return  podURL + "private/lomap/locations";
}