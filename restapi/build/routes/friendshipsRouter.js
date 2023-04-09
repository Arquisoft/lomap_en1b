"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const friendshipsService_1 = __importDefault(require("../services/friendshipsService"));
const frienshipsRouter = express_1.default.Router();
frienshipsRouter.get("/", friendshipsService_1.default.getFriends);
frienshipsRouter.post("/", friendshipsService_1.default.addFriend);
frienshipsRouter.delete("/", friendshipsService_1.default.deleteFriend);
exports.default = frienshipsRouter;
