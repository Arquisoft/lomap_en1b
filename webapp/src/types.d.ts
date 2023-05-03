import {LocationType} from "./locationType";

export type MapMarker = {
    id:string,
    name:string,
    locationType:LocationType,
    latitude:number,
    longitude:number,
    isShared: boolean,
    owner: string,
    isOwnLocation: boolean
    ownerName:string
};

export type Review = {
    markerId:string,
    comment:string,
    photo:File,
    score:double,
    encodedPhoto:string,
    owner:string
    ownerName:string
}

export type UserData = {
    webId:string,
    name: string
}

export type Friend = {
    nickName : string;
    name: string;
    webId : string;
    profilePic : string;
    loMapOnly : boolean;
}