"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticationService_1 = __importDefault(require("../services/authenticationService"));
const authenticationRouter = express_1.default.Router();
authenticationRouter.get("/login", authenticationService_1.default.initLogin);
authenticationRouter.get("/loginconfirm", authenticationService_1.default.confirmLogin);
authenticationRouter.get("/logout", authenticationService_1.default.logout);
authenticationRouter.get("/testlogin", authenticationService_1.default.initTestLogin);
authenticationRouter.get("/testloginconfirm", authenticationService_1.default.confirmTestLogin);
exports.default = authenticationRouter;
