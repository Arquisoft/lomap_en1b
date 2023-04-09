"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildTestLocationThing = exports.locationToThing = exports.thingToLocation = void 0;
const solid_client_1 = require("@inrupt/solid-client");
const vocab_common_rdf_1 = require("@inrupt/vocab-common-rdf");
function thingToLocation(locationThing) {
    return {
        id: locationThing.url,
        name: (0, solid_client_1.getStringNoLocale)(locationThing, vocab_common_rdf_1.SCHEMA_INRUPT.name),
        locationType: (0, solid_client_1.getStringNoLocale)(locationThing, vocab_common_rdf_1.SCHEMA_INRUPT.description),
        latitude: (0, solid_client_1.getDecimal)(locationThing, vocab_common_rdf_1.SCHEMA_INRUPT.latitude),
        longitude: (0, solid_client_1.getDecimal)(locationThing, vocab_common_rdf_1.SCHEMA_INRUPT.longitude)
    };
}
exports.thingToLocation = thingToLocation;
function locationToThing(location) {
    return (0, solid_client_1.buildThing)((0, solid_client_1.createThing)({ name: location.name }))
        .addStringNoLocale(vocab_common_rdf_1.SCHEMA_INRUPT.name, location.name)
        .addStringNoLocale(vocab_common_rdf_1.SCHEMA_INRUPT.description, location.locationType)
        .addDecimal(vocab_common_rdf_1.SCHEMA_INRUPT.latitude, location.latitude)
        .addDecimal(vocab_common_rdf_1.SCHEMA_INRUPT.longitude, location.longitude)
        .addUrl(vocab_common_rdf_1.RDF.type, "https://schema.org/Place")
        .build();
}
exports.locationToThing = locationToThing;
function buildTestLocationThing() {
    return (0, solid_client_1.buildThing)((0, solid_client_1.createThing)({ name: "Location2" }))
        .addStringNoLocale(vocab_common_rdf_1.SCHEMA_INRUPT.name, 'nuevaLocalizacion2')
        .addStringNoLocale(vocab_common_rdf_1.SCHEMA_INRUPT.description, "bar")
        .addDecimal(vocab_common_rdf_1.SCHEMA_INRUPT.latitude, 1)
        .addDecimal(vocab_common_rdf_1.SCHEMA_INRUPT.longitude, 2)
        .addUrl(vocab_common_rdf_1.RDF.type, "https://schema.org/Place")
        .build();
}
exports.buildTestLocationThing = buildTestLocationThing;
