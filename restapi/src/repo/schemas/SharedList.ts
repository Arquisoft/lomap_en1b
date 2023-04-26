import mongoose from 'mongoose'
const { Schema } = mongoose

const SharedListSchema = new Schema({

    //ID del propietario de la localizacion
    owner: String,
    //LIst with the IDs of those who can see it
    sharedList: [String]

})

export default  SharedListSchema;

