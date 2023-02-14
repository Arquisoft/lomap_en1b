// External dependencies
import { ObjectId } from "mongodb";
import Comment from "./comment";

// Class Implementation
export default class Review extends Comment{
    constructor(
        public text: string,
        public author: ObjectId,
        public stars : number,
        public id?: ObjectId) {
            super(text, author, id);
    }
}