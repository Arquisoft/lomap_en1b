import mongoose from 'mongoose'
const { Schema } = mongoose

const ReviewSchema = new Schema({
    stars : Number,
    comment : String,
    location : String,
    //FIXME: Podemos pasar varias
    images : [String]
})

export default  ReviewSchema;