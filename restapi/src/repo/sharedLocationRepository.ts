const LocationModel = require('../repo/schemas/Location')
import Location from '../types';
import {SharedLocationRepository} from "../repo/SharedLocationRepository";
export const SharedLocationRepository = {
    //Añadir una nueva copia de localizacion compartida a la base de datos
    //quitar esa localizacion de la base de datos


    async addSharedLocation(locationData: any) {

        //Update
    },

    async removeSharedLocation(locationId: string) {

    },

    async getLocation(locationId: string) {
        //@ts-ignore
        LocationModel.find({}).then( result =>{

            return result;
        })

    },

};