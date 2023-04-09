"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class Repository {
    constructor(collectionName, db) {
        this.collectionName = collectionName;
        this.db = db;
    }
    /**
     *
     * @param filter
     * @returns {Promise<*>}
     */
    find(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const collection = this.db.collection(this.collectionName);
                return yield collection.find(filter).toArray();
            }
            catch (error) {
                throw (error);
            }
        });
    }
    /**
     *
     * @param filter
     * @param page
     * @returns {Promise<{total: *, friendships: *}>}
     */
    findPg(filter, page) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const limit = 4;
                const collection = this.db.collection(this.collectionName);
                const collectionCount = yield collection.count();
                const cursor = collection.find(filter).skip((page - 1) * limit).limit(limit);
                const result = yield cursor.toArray();
                return { result: result, total: collectionCount };
            }
            catch (error) {
                throw (error);
            }
        });
    }
    /**
     *
     * @returns {Promise<any>}
     * @param newDocument
     */
    add(newDocument) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const collection = this.db.collection(this.collectionName);
                const result = yield collection.insertOne(newDocument);
                return result.insertedId;
            }
            catch (error) {
                throw (error);
            }
        });
    }
    /**
     *
     * @param filter
     * @returns {Promise<*>}
     */
    delete(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const collection = this.db.collection(this.collectionName);
                return yield collection.deleteOne(filter);
            }
            catch (error) {
                throw (error);
            }
        });
    }
    /**
     *
     * @param newDocument
     * @param filter
     * @returns {Promise<*>}
     */
    update(newDocument, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const collection = this.db.collection(this.collectionName);
                return yield collection.updateOne(filter, { $set: newDocument });
            }
            catch (error) {
                throw (error);
            }
        });
    }
}
exports.default = Repository;
