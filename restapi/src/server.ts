import express from 'express'
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import locationsRouter from "./routes/locationsRouter";
import authenticationRouter from "./routes/authenticationRouter";

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


