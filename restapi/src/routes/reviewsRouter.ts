import express, {Router} from "express";
import reviewsService from "../services/reviewsService";

const reviewsRouter: Router = express.Router()

reviewsRouter.get("/:locationID", reviewsService.getUserReviews);

reviewsRouter.post("/", reviewsService.addReview);

reviewsRouter.delete("/", reviewsService.deleteReview)

export default reviewsRouter