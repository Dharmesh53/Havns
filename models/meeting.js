import { Schema, model, models } from "mongoose";

const meetingSchema = new Schema({
  host: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  meetDate: {
    type: String,
  },
  meetTime: {
    type: String,
  },
  status: {
    type: String,
    enum: ["accepted", "declined", "pending"],
    default: "pending",
  },
});

const meetingModel = models.Meeting || model("Meeting", meetingSchema);

export default meetingModel;
