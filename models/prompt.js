import {Schema, model, models} from "mongoose";

const promptSchema = new Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    subject: {
        type: String,
        required: [true, "Subject is required"],
    },
    media: {
        type: String,
        required: [false, "attach link"],
    },
    description: {
        type: String,
        required: [false, "Description"],
    }
});

const prompt = models.prompt || model("prompt", promptSchema);
export default prompt;