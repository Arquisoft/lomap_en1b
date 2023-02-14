import {Application, Request, Response} from 'express';
import LocationsRepository from "../repositories/locationsRepository";
import {ObjectId} from "mongodb";

module.exports = function (server : Application, locationsRepository:LocationsRepository) {

    //list locations of specific user (own or on friends)
    server.get("/locations/{id}", function (req: Request, res: Response): Promise<Response> {
            return locationsRepository.getLocations({user:new ObjectId(req.params.id)})
                .then(result => res.send(result));
        }
    );

    //add a location
    server.post("/location/add", function(req:Request, res:Response):Promise<Response>{
            return locationsRepository.insertLocation(req.body.location)
                .then(result => res.send(result));
        }
    );
}