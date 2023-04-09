"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const locationsService_1 = __importDefault(require("../podsAccess/locationsService"));
const locationsRouter = express_1.default.Router();
locationsRouter.get("/", locationsService_1.default.getOwnLocations);
locationsRouter.post("/", locationsService_1.default.saveLocation);
locationsRouter.get("/addlocationtest", locationsService_1.default.saveTestLocation);
exports.default = locationsRouter;
