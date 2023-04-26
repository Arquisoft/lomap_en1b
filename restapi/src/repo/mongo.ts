const mongoose = require('mongoose');
const { model, Schema } = mongoose

//const connString = process.env.MONGO_CONN_STRING;
//FIXME: I will use this to try the connections
const connString = 'mongodb+srv://admin:' +
    'admin@musicstoreapp.cew3gcy.mongodb.net/' +
    'prueba?retryWrites=true&w=majority';

if(connString == undefined) throw new Error("MongoDB connection string is undefined")
mongoose.connect(connString, {
    useNewUrlParser : true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("Mongo connected :-)")
        //la config del servidor
        // @ts-ignore
    }).catch(err=> {
        console.error(err)
    })

/*

const ReviewSchema = new Schema({
    stars : Number,
    comment : String,
    location : String,
    //FIXME: Podemos pasar varias
    images : [String]
})

const Review = model('Review', ReviewSchema)
Review.find({})
    // @ts-ignore
    .then( result =>{
        console.log(result)
        mongoose.connection.close()
    })
    // @ts-ignore
    .catch(err => {
        console.log(err)
        mongoose.connection.close()
    })

const review = new Review({
    stars : 2,
    comment : "me gusto mucho",
    location : "loc id",
    //FIXME: Podemos pasar varias
    images : [""]
})

//Mongoose allways returna promise

review.save()
    // @ts-ignore
    .then( result => {
        console.log(result)
        mongoose.connection.close()
    })
    // @ts-ignore
    .catch(err => {
        console.log(err)
        mongoose.connection.close()
    })
 */

