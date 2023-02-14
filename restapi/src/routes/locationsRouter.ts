import {Express} from 'express'
import Repository from "../repo/repository";

module.exports = function(server:Express, _locationsRepository:Repository){

//list locations of specific user (own or on friends)
    server.get("/location/{id}", (_req, res) => {
            res.send('list locations')
        }
    );

//add a location
    server.post("/location/add", (_req, res) =>{
            res.send("add location")
        }
    );
}