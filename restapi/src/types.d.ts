import {LocationType} from "./locationType";

export type Location = {
    id:string,
    name:string,
    locationType:LocationType,
    latitude:number,
    longitude:number
    isShared:boolean,
    isOwnLocation:boolean
};

export type Review = {
    id:string,
    author:string,
    body:string,
    media:string
}

export type Friend = {
    nickName : string;
    name: string;
    webId : string;
    profilePic : string;
    loMapOnly : boolean;
}