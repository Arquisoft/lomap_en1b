import {Application} from "express";
import {Filter, MongoClient} from "mongodb";
import Location from "../models/location"

const {getConnection} = require("./db");
export default class LocationsRepository {

    constructor(
        private app:Application,
        private mongoClient:MongoClient) {}

    /**
     *
     * @param filter
     * @returns {Promise<*>}
     */
    async getLocations(filter: Filter<Location>) {
        try {
            const client = await getConnection(this.mongoClient, this.app.get('connectionStrings'))
            const database = client.db("lomap");
            const collectionName = 'locations';
            const locationsCollection = database.collection(collectionName);
            return await locationsCollection.find(filter).toArray();
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
    async getLocationsPg(filter:Filter<Location>, page:number) {
        try {
            const limit = 4;
            const client = await getConnection(this.mongoClient,this.app.get('connectionStrings'))
            const database = client.db("lomap");
            const collectionName = 'locations';
            const locationsCollection = database.collection(collectionName);
            const locationsCollectionCount = await locationsCollection.count();
            const cursor = locationsCollection.find(filter).skip((page - 1) * limit).limit(limit)
            const locations = await cursor.toArray();
            return {locations: locations, total: locationsCollectionCount};
        } catch (error) {
            throw (error);
        }
    }

    /**
     *
     * @param filter
     * @returns {Promise<*>}
     */
    async findLocation(filter:Filter<Location>) {
        try {
            const client = await getConnection(this.mongoClient,this.app.get('connectionStrings'))
            const database = client.db("lomap");
            const collectionName = 'locations';
            const locationsCollection = database.collection(collectionName);
            return await locationsCollection.findOne(filter);
        } catch (error) {
            throw (error);
        }
    }

    /**
     *
     * @returns {Promise<any>}
     * @param location
     */
    async insertLocation(location : Location) {
        try{
            const client = await getConnection(this.mongoClient,this.app.get('connectionStrings'))
            const database = client.db("lomap");
            const collectionName = 'locations';
            const locationsCollection = database.collection(collectionName);
            const result = await locationsCollection.insertOne(location);
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
    async deleteLocation(filter:Filter<Location>) {
        try {
            const client = await getConnection(this.mongoClient,this.app.get('connectionStrings'))
            const database = client.db("lomap");
            const collectionName = 'locations';
            const locationsCollection = database.collection(collectionName);
            return await locationsCollection.deleteOne(filter);
        } catch (error) {
            throw (error);
        }
    }

    /**
     *
     * @param newLocation
     * @param filter
     * @returns {Promise<*>}
     */
    async updateLocation(newLocation:Location, filter:Filter<Location>) {
        try {
            const client = await getConnection(this.mongoClient,this.app.get('connectionStrings'))
            const database = client.db("lomap");
            const collectionName = 'friendships';
            const friendshipCollection = database.collection(collectionName);
            return await friendshipCollection.updateOne(filter, {$set: newLocation});
        } catch (error) {
            throw (error);
        }
    }
}