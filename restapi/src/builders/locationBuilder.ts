import {buildThing, createThing, getDecimal, getStringNoLocale, Thing} from "@inrupt/solid-client";
import {Location} from "../types";
import {LocationType} from "../locationType";
import {RDF, SCHEMA_INRUPT} from "@inrupt/vocab-common-rdf";

export function thingToLocation(locationThing:Thing, ownerName:string) : Location {
    let splitId = locationThing.url.split("#").pop()
    if(splitId === null || splitId === 'undefined'){
        splitId = ''
    }

    return {
        id: splitId!,
        name: getStringNoLocale(locationThing, SCHEMA_INRUPT.name)!,
        locationType: getStringNoLocale(locationThing, SCHEMA_INRUPT.description)! as LocationType,
        latitude: getDecimal(locationThing, SCHEMA_INRUPT.latitude)!,
        longitude: getDecimal(locationThing, SCHEMA_INRUPT.longitude)!,
        isShared: false,        //sacarlo del pod
        isOwnLocation: true,   // true porque si lo sacas del pod, si o si tiene que ser tuyo
        owner:"",                //sacarlo del pod
        ownerName:ownerName //sacarlo del pod
    }
}
export function locationToThing(location:Location):Thing{
    return buildThing(createThing())
        .addStringNoLocale(SCHEMA_INRUPT.name, location.name)
        .addStringNoLocale(SCHEMA_INRUPT.description, location.locationType)
        .addDecimal(SCHEMA_INRUPT.latitude, location.latitude)
        .addDecimal(SCHEMA_INRUPT.longitude, location.longitude)
        .addUrl(RDF.type, "https://schema.org/Place")
        .build()
}