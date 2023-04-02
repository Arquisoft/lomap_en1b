import express from "express"
import cors from "cors"
import session from "express-session";
import locationsRouter from "./routes/locationsRouter";
import authenticationRouter from "./routes/authenticationRouter";
import friendshipsRouter from "./routes/friendshipsRouter";
import reviewsRouter from "./routes/reviewsRouter"

//dotenv.config()
const PORT = 8082

// Configure attribute in webapp session to link it to solid session
declare module 'express-session' {
    interface SessionData {
        solidSessionId:string;
    }
}

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


app.listen(PORT, ()=> {
    console.log('Server running on port ' + PORT)
})


//connectToDatabase(process.env.CONNECTION_STRING as string).then( db =>{
    //Repositories
//    let repoLocations = new Repository("locations", db);
    //Rutas
//    initLocationsRouter(app, repoLocations)
//} );


