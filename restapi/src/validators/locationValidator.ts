import {getDecimal, getStringNoLocale, Thing} from "@inrupt/solid-client";
import {Location} from "../types";
import {LocationType} from "../locationType";
import {SCHEMA_INRUPT} from "@inrupt/vocab-common-rdf";

export function validateLocationThing(locationThing:Thing) : boolean {
        return getStringNoLocale(locationThing, SCHEMA_INRUPT.name) !== undefined
            && getStringNoLocale(locationThing, SCHEMA_INRUPT.description) !== undefined
            && isLocationEnumType(getStringNoLocale(locationThing, SCHEMA_INRUPT.description)!)
            && getDecimal(locationThing, SCHEMA_INRUPT.latitude) !== undefined
            && getDecimal(locationThing, SCHEMA_INRUPT.longitude) !== undefined
}

function isLocationEnumType(locationType:string):boolean {
    const values = Object.values(LocationType);
    return (values.includes(locationType as unknown as LocationType));
}

export function validateLocation(location:Location) : boolean{
    return location !== undefined;
}