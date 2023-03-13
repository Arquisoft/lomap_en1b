import express, {Router} from 'express'
import locationsService from "../podsAccess/locationsService";

const locationsRouter: Router = express.Router()

    locationsRouter.get("/", locationsService.getOwnLocations);

    locationsRouter.post("/", locationsService.saveLocation);

    locationsRouter.get("/addlocationtest", locationsService.saveTestLocation)

export default locationsRouter