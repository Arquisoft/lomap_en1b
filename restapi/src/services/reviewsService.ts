import {Request, Response} from "express"
import { Review } from "../repo/mongo"

export default {

    addReview: async () => {
        const newReview = new Review({//builder pasa errores al padre
        })
        /*
        const newReview = llamamos al builder y que nos devuelva ya el objeto creado pasandole la parte del request param que
        tiene el json con la info del review
         */

        newReview.save()
    },

    getReviews: async function (req:Request, res:Response){
        const reviews = await Review.find({
            location: req.params.locationId
        })
        res.send(reviews);
    },

}
