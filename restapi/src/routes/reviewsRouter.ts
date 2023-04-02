import express, {Router} from "express";
import reviewsService from "../services/reviewsService";

const reviewsRouter: Router = express.Router()

reviewsRouter.get("/", reviewsService.getReviews);

reviewsRouter.post("/", reviewsService.addReview);

reviewsRouter.delete("/", reviewsService.deleteReview)

export default reviewsRouter