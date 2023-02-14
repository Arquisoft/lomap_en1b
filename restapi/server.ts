let express = require('express');

let app = express();

const port: number = 5000;

// Módulo para leer cuerpo de peticiones posts
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Cliente mongo
console.log(process.env)
const { MongoClient } = require("mongodb");
const url = "";
app.set('connectionStrings', url);

//Repositorios
let locationsRepository = require("./repositories/locationsRepository");
locationsRepository.init(app, MongoClient);

//Rutas
require("./routes/locationsRoutes.js")(app, locationsRepository);

// Uso de json para las respuestas
app.use(express.json());

// Codificación de urls
app.use(express.urlencoded({ extended: false }));

app.listen(port, ():void => {
    console.log('Restapi listening on '+ port);
}).on("error",(error:Error)=>{
    console.error('Error occured: ' + error.message);
});

