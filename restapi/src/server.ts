import express from 'express'
import expressSession from 'express-session'
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import locationsRouter from "./routes/locationsRouter";
import authenticationRouter from "./routes/authenticationRouter";

//dotenv.config()
const PORT = 8082

const app = express()
    .use(cookieParser())
    .use(expressSession({secret:'asdfg'}))
    .use(bodyParser())
    .use(express.json())
    .use('/auth', authenticationRouter)
    .use('/location', locationsRouter)


app.listen(PORT, ()=> {
    console.log('Server running on port' + PORT)
})


//connectToDatabase(process.env.CONNECTION_STRING as string).then( db =>{
    //Repositories
//    let repoLocations = new Repository("locations", db);
    //Rutas
//    initLocationsRouter(app, repoLocations)
//} );


