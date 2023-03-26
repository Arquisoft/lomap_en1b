import {LocationType} from "./locationType";

export type Location = {
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

