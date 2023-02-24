import express, {Router} from "express";
import authenticationService from "../podsAccess/authenticationService";

const authenticationRouter: Router = express.Router()

    authenticationRouter.get("/login", authenticationService.initLogin);

    authenticationRouter.get("/home", authenticationService.confirmLogin);

    authenticationRouter.get("/logout", authenticationService.logout);

export default authenticationRouter