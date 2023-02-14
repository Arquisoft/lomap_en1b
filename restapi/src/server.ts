import express from 'express'
import * as dotenv from 'dotenv'
import Repository from "./repo/repository";
import {connectToDatabase} from "./repo/db";

const app = express()

const PORT = 8082

app.use(express.json())
dotenv.config()

//Get db
connectToDatabase(process.env.CONNECTION_STRING as string).then( db =>{

    //Repositories
    let repoLocations = new Repository("locations", db);

    //Rutas
    //Mirar para cambiar a un import en lugar de require
    require('./routes/locationsRouter')(app, repoLocations)

    app.get('/ping', (_req, res) => {
        console.log('pinged')
        res.send('ok')
    })

    app.listen(PORT, ()=> {
        console.log('Server running on port' + PORT)
    })
} );


