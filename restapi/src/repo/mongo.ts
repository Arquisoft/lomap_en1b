import mongoose from 'mongoose'
const { model } = mongoose

import ReviewSchema from "./schemas/Review"

const connString = process.env.MONGO_CONN_STRING;

if(connString == undefined) throw new Error("MongoDB connection string is undefined")

mongoose.connect(connString)
    .then(() => console.log("Mongo connected :-)"))

export const Review = model('Review', ReviewSchema)