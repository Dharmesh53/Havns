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
  status: {
    type: String,
  },
});

const meetingModel = models.meeting || model("meeting", meetingSchema);

export default meetingModel;
