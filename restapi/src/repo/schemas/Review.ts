const { model, Schema } = mongoose
const ReviewSchema = new Schema({
    stars : Number,
    comment : String,
    location : String,
    //FIXME: Podemos pasar varias
    images : [String]
})

const Review = model('Review', ReviewSchema)

export default  Review;