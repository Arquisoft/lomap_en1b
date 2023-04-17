import express, {Router} from 'express'
import reviewsService from "../services/reviewsService";

const reviewsRouter: Router = express.Router()

reviewsRouter.get("/:locationId", reviewsService.getReviews);

reviewsRouter.post("/", reviewsService.addReview);

export default reviewsRouter