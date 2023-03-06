import {
    buildThing,
    createThing,
    getPodUrlAll,
    getSolidDataset, getThingAll,
    saveSolidDatasetAt,
    setThing
} from "@inrupt/solid-client";
import {RDF, SCHEMA_INRUPT} from "@inrupt/vocab-common-rdf";
import {Location} from "../types";
import {Request, Response} from "express";
import {getSessionFromStorage} from "@inrupt/solid-client-authn-node";


export default {

    saveLocation: async function (req:Request, _res:Response){

        const session = await getSessionFromStorage(req.session!.id)

        let encryptedWebID : string = '';
        let location : Location = req.body.location;

        let locationsURL = await getLocationsURL(encryptedWebID);

        let locationsSolidDataset = await getSolidDataset(
            locationsURL,
            {fetch: session!.fetch}          // fetch from authenticated session
        );

        const locationThing = buildThing(createThing({ name: "Location1" }))
            .addStringNoLocale(SCHEMA_INRUPT.name, location.name)
            .addDecimal(SCHEMA_INRUPT.latitude, location.latitude)
            .addDecimal(SCHEMA_INRUPT.longitude, location.longitude)
            .addUrl(RDF.type, "https://schema.org/Place")
            .build();

        locationsSolidDataset = setThing(locationsSolidDataset, locationThing);

        return await saveSolidDatasetAt(
            locationsURL,
            locationsSolidDataset,
            {fetch: session!.fetch}             // fetch from authenticated Session
        );
    },



    getOwnLocations: async function (req:Request, _res:Response){

        const session = await getSessionFromStorage(req.session!.id)

        let encryptedWebID:string='';
        let locationsURL = await getLocationsURL(encryptedWebID);

        let myDataset =  await getSolidDataset(
            locationsURL,
            {fetch: session!.fetch}          // fetch from authenticated session
        );
        return getThingAll(myDataset)
    }
}

async function getLocationsURL(encryptedWebID:string){
    let webID = decodeURIComponent(encryptedWebID)
    const podURL = await getPodUrlAll(webID, { fetch: fetch });
    return  podURL + "/private/locations";
}