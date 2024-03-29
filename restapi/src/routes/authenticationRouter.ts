import express from "express";
import authenticationService from "../services/authenticationService";

const authenticationRouter = express.Router()

    authenticationRouter.get("/login", authenticationService.initLogin);
    authenticationRouter.get("/loginconfirm", authenticationService.confirmLogin);
    authenticationRouter.get("/logout", authenticationService.logout);

export default authenticationRouter