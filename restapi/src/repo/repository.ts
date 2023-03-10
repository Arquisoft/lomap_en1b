import {Db, Filter, Document} from "mongodb";

export default class Repository {

    private readonly collectionName:string;
    private db:Db;

    constructor(collectionName:string, db:Db) {
        this.collectionName = collectionName;
        this.db = db;
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