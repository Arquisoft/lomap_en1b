import express from "express"
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import locationsRouter from "./routes/locationsRouter";
import authenticationRouter from "./routes/authenticationRouter";
import cors from "cors"

//dotenv.config()
const PORT = 8082

const app = express()
    .use(cookieSession({
        name: "session",
        //  keys to sign the cookies.
        keys: [
            "key1",
            "key2",
        ],
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
    }))
    .use(bodyParser())
    .use(cors())
    .use(function(_, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Credentials", "true");
        res.header("Access-Control-Allow-Methods", "POST, GET, DELETE, UPDATE, PUT");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token")
        next();})
    .use(express.json())
    .use('/auth', authenticationRouter)
    .use('/location', locationsRouter);



app.listen(PORT, ()=> {
    console.log('Server running on port ' + PORT)
})


//connectToDatabase(process.env.CONNECTION_STRING as string).then( db =>{
    //Repositories
//    let repoLocations = new Repository("locations", db);
    //Rutas
//    initLocationsRouter(app, repoLocations)
//} );


