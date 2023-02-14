// External dependencies
import { ObjectId } from "mongodb";

// Class Implementation
export default class Location {
    constructor(
        public name: string,
        public coordX: number,
        public coordY: number,
        public category: string,
        public user: ObjectId,
        public id?: ObjectId) {}
}