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
        const cosa = [{
                "nickName": "nickname1",
                "name": "name1",
                "webId": "webId1",
                "profilePic": "profilePic1",
                "loMapOnly": true
            },
            {
                "nickName": "nickname2",
                "name": "name2",
                "webId": "webId2",
                "profilePic": "profilePic2",
                "loMapOnly": true
            },
            {
                "nickName": "nickname3",
                "name": "name3",
                "webId": "webId3",
                "profilePic": "profilePic3",
                "loMapOnly": true
            },
            {
                "nickName": "nickname4",
                "name": "name4",
                "webId": "webId4",
                "profilePic": "profilePic4",
                "loMapOnly": false
            },
            {
                "nickName": "nickname5",
                "name": "name5",
                "webId": "webId5",
                "profilePic": "profilePic5",
                "loMapOnly": true
            },
            {
                "nickName": "nickname6",
                "name": "name6",
                "webId": "webId6",
                "profilePic": "profilePic6",
                "loMapOnly": true
            },
            {
                "nickName": "nickname7",
                "name": "name7",
                "webId": "webId7",
                "profilePic": "profilePic7",
                "loMapOnly": false
            }];
        cosa.entries();
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
