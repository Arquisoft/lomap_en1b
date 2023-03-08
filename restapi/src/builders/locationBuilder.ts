import {buildThing, createThing, getDecimal, getStringNoLocale, Thing} from "@inrupt/solid-client";
import {Location, LocationType} from "../types";
import {RDF, SCHEMA_INRUPT} from "@inrupt/vocab-common-rdf";

export function thingToLocation(locationThing:Thing) : Location {
    console.log(locationThing)
    return {
        url: locationThing.url,
        name: getStringNoLocale(locationThing, SCHEMA_INRUPT.name)!,
        locationType: getStringNoLocale(locationThing, SCHEMA_INRUPT.description)! as LocationType,
        latitude: getDecimal(locationThing, SCHEMA_INRUPT.latitude)!,
        longitude: getDecimal(locationThing, SCHEMA_INRUPT.longitude)!
    }
}

export function locationToThing(location:Location):Thing{
    return buildThing(createThing({name: "Location1"}))
        .addStringNoLocale(SCHEMA_INRUPT.name, location.name)
        .addStringNoLocale(SCHEMA_INRUPT.description, location.locationType)
        .addDecimal(SCHEMA_INRUPT.latitude, location.latitude)
        .addDecimal(SCHEMA_INRUPT.longitude, location.longitude)
        .addUrl(RDF.type, "https://schema.org/Place")
        .build()
}