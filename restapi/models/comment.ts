// External dependencies
import { ObjectId } from "mongodb";

// Class Implementation
export default class Comment {
    constructor(
        public text: string,
        public author: ObjectId,
        public id?: ObjectId) {

    }
}