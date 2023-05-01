import {Db, Filter, Document} from "mongodb";
import {Friend} from "../types";

export default class Repository {

    private readonly collectionName:string;
    private db:Db;

    constructor(collectionName:string, db:Db) {
        this.collectionName = collectionName;
        this.db = db;
        const cosa : Friend[] = [{
                "nickName" : "nickname1",
                "name": "name1",
                "webId" : "webId1",
                "profilePic" : "profilePic1",
                "loMapOnly" : true
            },
            {
                "nickName" : "nickname2",
                "name": "name2",
                "webId" : "webId2",
                "profilePic" : "profilePic2",
                "loMapOnly" : true
            },
            {
                "nickName" : "nickname3",
                "name": "name3",
                "webId" : "webId3",
                "profilePic" : "profilePic3",
                "loMapOnly" : true
            },
            {
                "nickName" : "nickname4",
                "name": "name4",
                "webId" : "webId4",
                "profilePic" : "profilePic4",
                "loMapOnly" : false
            },
            {
                "nickName" : "nickname5",
                "name": "name5",
                "webId" : "webId5",
                "profilePic" : "profilePic5",
                "loMapOnly" : true
            },
            {
                "nickName" : "nickname6",
                "name": "name6",
                "webId" : "webId6",
                "profilePic" : "profilePic6",
                "loMapOnly" : true
            },
            {
                "nickName" : "nickname7",
                "name": "name7",
                "webId" : "webId7",
                "profilePic" : "profilePic7",
                "loMapOnly" : false
            }];

        cosa.entries();
    }

    /**
     *
     * @param filter
     * @returns {Promise<*>}
     */
    async find(filter: Filter<Document>) {
        try {
            const collection = this.db.collection(this.collectionName);
            return await collection.find(filter).toArray();
        } catch (error) {
            throw (error);
        }
    }

    /**
     *
     * @param filter
     * @param page
     * @returns {Promise<{total: *, friendships: *}>}
     */
     async findPg(filter:Filter<Document>, page:number) {
        try {
            const limit = 4;
            const collection = this.db.collection(this.collectionName);
            const collectionCount = await collection.count();
            const cursor = collection.find(filter).skip((page - 1) * limit).limit(limit)
            const result = await cursor.toArray();
            return {result: result, total: collectionCount};
        } catch (error) {
            throw (error);
        }
    }

    /**
     *
     * @returns {Promise<any>}
     * @param newDocument
     */
    async add(newDocument : Document) {
        try{
            const collection = this.db.collection(this.collectionName);
            const result = await collection.insertOne(newDocument);
            return result.insertedId;
        } catch(error) {
            throw (error);
        }
    }

    /**
     *
     * @param filter
     * @returns {Promise<*>}
     */
    async delete(filter:Filter<Document>) {
        try {
            const collection = this.db.collection(this.collectionName);
            return await collection.deleteOne(filter);
        } catch (error) {
            throw (error);
        }
    }

    /**
     *
     * @param newDocument
     * @param filter
     * @returns {Promise<*>}
     */
    async update(newDocument:any, filter:Filter<Document>) {
        try {
            const collection = this.db.collection(this.collectionName);
            return await collection.updateOne(filter, {$set: newDocument});
        } catch (error) {
            throw (error);
        }
    }
}