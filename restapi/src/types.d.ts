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
    markerId:string,
    comment:string,
    score:double,
    encodedPhoto:string
}

export type Friend = {
    nickName : string;
    name: string;
    webId : string;
    profilePic : string;
    loMapOnly : boolean;

}