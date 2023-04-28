import express from "express"
import cors from "cors"
import session from "express-session";
import locationsRouter from "./routes/locationsRouter";
import authenticationRouter from "./routes/authenticationRouter";
import friendshipsRouter from "./routes/friendshipsRouter";
import reviewsRouter from "./routes/reviewsRouter"

//dotenv.config()
const PORT = 8082
const mongoose = require('mongoose');

// Configure attribute in webapp session to link it to solid session
declare module 'express-session' {
    interface SessionData {
        solidSessionId:string;
    }
}

//const connString = process.env.MONGO_CONN_STRING;
//FIXME: I will use this to try the connections
const connString = 'mongodb+srv://admin:' +
    'admin@musicstoreapp.cew3gcy.mongodb.net/' +
    'prueba?retryWrites=true&w=majority';

if(connString == undefined) throw new Error("MongoDB connection string is undefined")

const app = express()
    .use(session({
        secret: "ASDFG", // Secret key,
        saveUninitialized: true,
        resave: true
    }))
    .use(cors({origin: "http://localhost:3000", credentials: true}))
    .use(express.json())
    .use('/auth', authenticationRouter)
    .use('/location', locationsRouter)
    .use('/friendship', friendshipsRouter)
    .use('/review', reviewsRouter)
//    .use(function (_err:Errback, _req:Request, res:Response, _next:NextFunction){
//        return res.status(500).send("Internal server error.")
//    })

mongoose.connect(connString, {
    useNewUrlParser : true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("Mongo connected :-)")
        //la config del servidor
        app.listen(PORT, ()=> {
            console.log('Server running on port ' + PORT)
        })

        // @ts-ignore
    }).catch(err=> {
    console.error(err)
})