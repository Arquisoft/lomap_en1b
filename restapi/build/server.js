"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const locationsRouter_1 = __importDefault(require("./routes/locationsRouter"));
const authenticationRouter_1 = __importDefault(require("./routes/authenticationRouter"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const friendshipsRouter_1 = __importDefault(require("./routes/friendshipsRouter"));
//dotenv.config()
const PORT = 8082;
const app = (0, express_1.default)()
    .use((0, express_session_1.default)({
    secret: "ASDFG",
    saveUninitialized: true,
    resave: true
}))
    .use((0, cors_1.default)({ origin: "http://localhost:3000", credentials: true }))
    .use(express_1.default.json())
    .use('/auth', authenticationRouter_1.default)
    .use('/location', locationsRouter_1.default)
    .use('/frienship', friendshipsRouter_1.default);
app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
});
//connectToDatabase(process.env.CONNECTION_STRING as string).then( db =>{
//Repositories
//    let repoLocations = new Repository("locations", db);
//Rutas
//    initLocationsRouter(app, repoLocations)
//} );
