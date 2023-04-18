"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLocation = exports.validateLocationThing = void 0;
const solid_client_1 = require("@inrupt/solid-client");
//import {LocationType} from "../locationType";
const vocab_common_rdf_1 = require("@inrupt/vocab-common-rdf");
function validateLocationThing(locationThing) {
    return (0, solid_client_1.getStringNoLocale)(locationThing, vocab_common_rdf_1.SCHEMA_INRUPT.name) !== undefined
        && (0, solid_client_1.getStringNoLocale)(locationThing, vocab_common_rdf_1.SCHEMA_INRUPT.name) !== null
        //            && getStringNoLocale(locationThing, SCHEMA_INRUPT.description) !== undefined
        //            && isLocationEnumType(getStringNoLocale(locationThing, SCHEMA_INRUPT.description)!)
        && (0, solid_client_1.getDecimal)(locationThing, vocab_common_rdf_1.SCHEMA_INRUPT.latitude) !== undefined
        && (0, solid_client_1.getDecimal)(locationThing, vocab_common_rdf_1.SCHEMA_INRUPT.latitude) !== null
        && (0, solid_client_1.getDecimal)(locationThing, vocab_common_rdf_1.SCHEMA_INRUPT.longitude) !== undefined
        && (0, solid_client_1.getDecimal)(locationThing, vocab_common_rdf_1.SCHEMA_INRUPT.longitude) !== null;
}
exports.validateLocationThing = validateLocationThing;
//function isLocationEnumType(locationType:string):boolean {
//    const values = Object.values(LocationType);
//    return (values.includes(locationType as unknown as LocationType));
//}
function validateLocation(location) {
    return location !== undefined;
}
exports.validateLocation = validateLocation;
