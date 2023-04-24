import express, {Router} from "express";
import friendshipsService from "../services/friendshipsService";

const friendshipsRouter: Router = express.Router()

friendshipsRouter.get("/", friendshipsService.getFriends);

friendshipsRouter.post("/", friendshipsService.addFriend);

friendshipsRouter.delete("/", friendshipsService.deleteFriend)

export default friendshipsRouter