import {Schema, model, models} from "mongoose";

const EventSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    subject: {
        type: String,
        required: [true, "Subject is required"],
    },
    description: {
        type: String,
        required: [true, "Description"],
    },
    media: {
        type: String,
        required: [false, "attach link"],
    },
    date: {
        type: Date,
        required: [true, "set the date"]
    },
    location: {
        type:String,
        required: [true, "set the location"]
    },
    color: {
        type:String,
        required: [true, "set the color"]
    }
});

const Event = models.Event || model("Event", EventSchema);
export default Event;