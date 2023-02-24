import express, {Router} from 'express'
import locationsService from "../podsAccess/locationsService";

const authenticationRouter: Router = express.Router()

    authenticationRouter.get("/locations", locationsService.getOwnLocations);

    authenticationRouter.post("/location/add", locationsService.saveLocation);

export default authenticationRouter