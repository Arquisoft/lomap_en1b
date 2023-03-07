import express, {Router} from 'express'
import locationsService from "../podsAccess/locationsService";

const authenticationRouter: Router = express.Router()

    authenticationRouter.get("/", locationsService.getOwnLocations);

    authenticationRouter.post("/", locationsService.saveLocation);

export default authenticationRouter