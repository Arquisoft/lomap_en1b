import express, {Router} from "express";
import friendshipsService from "../services/friendshipsService";

const frienshipsRouter: Router = express.Router()

frienshipsRouter.get("/", friendshipsService.getFriends);

frienshipsRouter.post("/", friendshipsService.addFriend);

frienshipsRouter.delete("/", friendshipsService.deleteFriend)

export default frienshipsRouter