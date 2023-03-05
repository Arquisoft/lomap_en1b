import express, {Router} from "express";
import authenticationService from "../podsAccess/authenticationService";

const authenticationRouter: Router = express.Router()

    authenticationRouter.get("/auth/login", authenticationService.initLogin);

    authenticationRouter.get("/auth/loginconfirm", authenticationService.confirmLogin);

    authenticationRouter.get("/auth/logout", authenticationService.logout);

export default authenticationRouter