import mongoose from 'mongoose'
import LocationSchema from './schemas/Location';
import ReviewSchema from "./schemas/Review"
import SharedListSchema from './schemas/SharedList';
const { model } = mongoose

const connString = process.env.MONGO_CONN_STRING;

if(connString == undefined) throw new Error("MongoDB connection string is undefined")

mongoose.connect(connString)
    .then(() => console.log("Mongo connected :-)"))

export const Review = model('Review', ReviewSchema)
export const Location = model('Location', LocationSchema)
export const SharedList = model('SharedList', SharedListSchema)

