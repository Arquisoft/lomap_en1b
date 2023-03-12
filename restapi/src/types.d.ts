import {LocationType} from "./locationType";

export type Location = {
    url:string,
    name:string,
    locationType:LocationType,
    latitude:number,
    longitude:number
};

