import {
    getPodUrlAll,
    getSolidDataset, getThingAll,
    saveSolidDatasetAt,
    setThing
} from "@inrupt/solid-client";
import {Location} from "../types";
import {Request, Response} from "express";
import {getSessionFromStorage} from "@inrupt/solid-client-authn-node";
import {locationToThing, thingToLocation} from "../builders/locationBuilder"


export default {

    saveLocation: async function (req:Request, res:Response){

        const session = await getSessionFromStorage(req.session!.id)
        if(session==undefined) return res.send('error')

        let locationsURL = await getLocationsURL(session.info.webId);
        if(locationsURL == undefined) return res.send("error")

        let location : Location = req.body.location;

        let locationsSolidDataset = await getSolidDataset(
            locationsURL,
            {fetch: session.fetch}          // fetch from authenticated session
        );



        const locationThing = locationToThing(location)

//        const locationThing = buildThing(createThing({ name: "Location1" }))
//            .addStringNoLocale(SCHEMA_INRUPT.name, 'nuevaLocalizacion')
//            .addDecimal(SCHEMA_INRUPT.latitude, 1)
//            .addDecimal(SCHEMA_INRUPT.longitude, 2)
//            .addUrl(RDF.type, "https://schema.org/Place")
//           .build();

        locationsSolidDataset = setThing(locationsSolidDataset, locationThing);

        return res.send(await saveSolidDatasetAt(
            locationsURL,
            locationsSolidDataset,
            {fetch: session!.fetch}             // fetch from authenticated Session
        ));
    },



    getOwnLocations: async function (req:Request, res:Response){

        const session = await getSessionFromStorage(req.session!.id)
        if(session==undefined)return res.send('error')

        let locationsURL = await getLocationsURL(session.info.webId);
        if(locationsURL == undefined) return res.send("error")

        let myDataset =  await getSolidDataset(
            locationsURL,
            {fetch: session.fetch}          // fetch from authenticated session
        );

        return res.send(getThingAll(myDataset).map(locationThing=>thingToLocation(locationThing)))
    }
}

async function getLocationsURL(webId: string | undefined){
    if(webId == undefined) return undefined
    let webID = decodeURIComponent(webId)
    const podURL = await getPodUrlAll(webID);
    console.log(podURL)
    return  podURL + "private/";
}