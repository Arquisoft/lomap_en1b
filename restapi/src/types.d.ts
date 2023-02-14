import {ObjectId} from "mongodb";

export interface Location {
    id:ObjectId,
    coordX:number,
    coordY:number,
    name:string
}