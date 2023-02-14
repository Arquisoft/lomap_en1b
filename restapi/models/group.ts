// External dependencies
import { ObjectId } from "mongodb";
import User from "./user";

// Class Implementation
export class Group {
    constructor(
        public members: Array<User>,
        public id?: ObjectId) {}
}