// External dependencies
import { ObjectId } from "mongodb";

// Class Implementation
export default class User {

    constructor(
        public name: string,
        public surname: string,
        public friends: Array<ObjectId>,
        public id?: ObjectId) {
    }

}