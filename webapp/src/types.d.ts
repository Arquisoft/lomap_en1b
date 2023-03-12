import {LocationType} from "./locationType";

export type MapMarker = {
    id:string,
    name:string,
    locationType:LocationType,
    latitude:number,
    longitude:number
};


export type Friend = {
    username : string;
    podId : string;
}