import {buildThing, Thing} from "@inrupt/solid-client";
import {RDF, SCHEMA_INRUPT} from "@inrupt/vocab-common-rdf";
import {LocationType} from "../../src/locationType";
import {locationToThing, thingToLocation} from "../../src/builders/locationBuilder";
import {Location} from "../../src/types";

let location: Location = {
    id:"test",
    name: "name",
    locationType:LocationType.restaurant,
    latitude:45,
    longitude:90,
    isShared: false,
    isOwnLocation: true
}
let locationThing:Thing = buildThing()
    .addStringNoLocale(SCHEMA_INRUPT.name, "      ")
    .addStringNoLocale(SCHEMA_INRUPT.description, LocationType.bar)
    .addDecimal(SCHEMA_INRUPT.latitude, 0)
    .addDecimal(SCHEMA_INRUPT.longitude, 0)
    .addUrl(RDF.type, "https://schema.org/Place")
    .build();

test("Location to thing", ()=> {
    expect(locationThing == locationToThing(location));
})

test("Thing to location", ()=> {
    expect(location == thingToLocation(locationThing));
})