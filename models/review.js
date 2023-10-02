import {Schema, models,model} from "mongoose"

const reviewSchema = new Schema({
    hallId : {
        type: Schema.type.objectId ,
        ref:"hall"
    },
    stars:{
        type:Number,
        default:0, 
        required:true
    },
    feedback:{
        type:String,
        required:true
    }
})

const ReviewModel = models.review || model("review",reviewSchema)

module.exports = ReviewModel