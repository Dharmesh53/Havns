import {Schema, models,model} from "mongoose"

const reviewSchema = new Schema({
  UserId: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  HallId: {
    type: Schema.Types.ObjectId,
    ref: "hall",
  },
  stars: {
    type: Number,
    default: 0,
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  },
});

const ReviewModel = models.review || model("review",reviewSchema)

module.exports = ReviewModel