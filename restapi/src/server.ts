import express, {Errback, NextFunction, Response, Request} from "express"
import cors from "cors"
import session from "express-session";
import locationsRouter from "./routes/locationsRouter";
import authenticationRouter from "./routes/authenticationRouter";
import friendshipsRouter from "./routes/friendshipsRouter";
import reviewsRouter from "./routes/reviewsRouter"
import userDataRouter from "./routes/userDataRouter"
const mongoose = require('mongoose'); //not an import because if we use import we get typing problems

//dotenv.config()
const PORT = 8082

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


// const connString = "mongodb://35.180.234.117:27017/"

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
    .use('/userData', userDataRouter)
    .use(function (_err:Errback, _req:Request, res:Response, _next:NextFunction){
        return res.status(500).send("Internal server error.")
    })

mongoose.connect(connString, {
    useNewUrlParser : true,
    useUnifiedTopology: true,
}).then(() => {
        console.log("Mongo connected :-)")
        app.listen(PORT, ()=> {
            console.log('Server running on port ' + PORT)
        })
}).catch((err: any)=> {
    console.error(err)
})