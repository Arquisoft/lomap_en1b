import express from "express"
import locationsRouter from "./routes/locationsRouter";
import authenticationRouter from "./routes/authenticationRouter";
import cors from "cors"
import session from "express-session";

//dotenv.config()
const PORT = 8082

const app = express()
    .use(session({
        secret: "ASDFG", // Secret key,
        saveUninitialized: true,
        resave: true
    }))
    .use(cors({origin: "http://localhost:3000", credentials: true}))
    /*.use(function(_, res, next) {
        res.header("Access-Control-Allow-Origin", "http://127.0.0.1:3000/");
        res.header("Access-Control-Allow-Credentials", "true");
        res.header("Access-Control-Allow-Methods", "POST, GET, DELETE, UPDATE, PUT");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token")
        next();})*/

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


