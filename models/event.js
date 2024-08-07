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
        required: [false, "Description"],
    },
    media: {
        type: String,
        required: [false, "attach link"],
    },
    date: {
        type: Date,
        required: [true, "set the date"]
    },
    start_time: {
        type: String,
        required: [true, "set the start time"]
    },
    end_time: {
        type: String,
        required: [true, "set the end time"]
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