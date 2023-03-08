import {buildThing, createThing, Thing} from "@inrupt/solid-client";
import {Location} from "../types";
import {RDF, SCHEMA_INRUPT} from "@inrupt/vocab-common-rdf";

export function thingToLocation(locationThing:Thing) : Location {
    console.log(locationThing)
    return {
        id: '',
        name: '',
        latitude: 0,
        longitude: 0
    }
}

export function locationToThing(location:Location):Thing{
    return buildThing(createThing({name: "Location1"}))
        .addStringNoLocale(SCHEMA_INRUPT.name, location.name)
        .addDecimal(SCHEMA_INRUPT.latitude, location.latitude)
        .addDecimal(SCHEMA_INRUPT.longitude, location.longitude)
        .addUrl(RDF.type, "https://schema.org/Place")
        .build()
}

