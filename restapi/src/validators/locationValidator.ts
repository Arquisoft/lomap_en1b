import {getDecimal, getStringNoLocale, Thing} from "@inrupt/solid-client";
import {Location} from "../types";
//import {LocationType} from "../locationType";
import {SCHEMA_INRUPT} from "@inrupt/vocab-common-rdf";
import {isEmpty} from "./util/validationUtils";

export function validateLocationThing(locationThing:Thing) : boolean {
        return !isEmpty(getStringNoLocale(locationThing, SCHEMA_INRUPT.name))
            && !isEmpty(getStringNoLocale(locationThing, SCHEMA_INRUPT.description))
//            && isLocationEnumType(getStringNoLocale(locationThing, SCHEMA_INRUPT.description)!)
            && getDecimal(locationThing, SCHEMA_INRUPT.latitude) !== undefined
            && getDecimal(locationThing, SCHEMA_INRUPT.latitude) !== null
            && Math.abs(getDecimal(locationThing, SCHEMA_INRUPT.latitude)!) <= 90
            && getDecimal(locationThing, SCHEMA_INRUPT.longitude) !== undefined
            && getDecimal(locationThing, SCHEMA_INRUPT.longitude) !== null
            && Math.abs(getDecimal(locationThing, SCHEMA_INRUPT.longitude)!) <=180
}

export function validateLocation(location:Location) : boolean{
    return location !== undefined
        && location !== null
        && !isEmpty(location.name)
        && location.latitude !== undefined
        && location.latitude !== null
        && Math.abs(location.latitude) <= 90
        && location.longitude !== undefined
        && location.longitude !== null
        && Math.abs(location.longitude) <= 180
        && location.locationType !== undefined
        && location.locationType !== null;
//        && isLocationEnumType(location.locationType);
}

//function isLocationEnumType(locationType:string):boolean {
//    const values = Object.values(LocationType);
//    return (values.includes(locationType as LocationType));
//}

