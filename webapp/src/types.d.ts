import {LocationType} from "./locationType";

export type MapMarker = {
    id:string,
    name:string,
    locationType:LocationType,
    latitude:number,
    longitude:number,
    isShared: boolean,
    owner:string
};

export type Review = {
    markerId:string,
    comment:string,
    photo:File,
    score:double,
    encodedPhoto:string,
    owner:string
}



export type Friend = {
    nickName : string;
    name: string;
    webId : string;
    profilePic : string;
    loMapOnly : boolean;
}