import express from "express";
import authenticationService from "../podsAccess/authenticationService";

const authenticationRouter = express.Router()

    authenticationRouter.post("/login", authenticationService.initLogin);

    authenticationRouter.get("/loginconfirm", authenticationService.redirectConfirm);
    authenticationRouter.post("/loginconfirm", authenticationService.confirmLogin);

    authenticationRouter.get("/logout", authenticationService.logout);

export default authenticationRouter