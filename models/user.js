import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, 
            "Username is invalid, should contain 8-20 characters and be unique"]
    },
    password: {
        type:String,
        required: true
    },
    image: {
        type: String,
        default: "https://i.imgur.com/p63FHhZ.jpg"
    },
    invites: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: "Event"
            }
        ],
        default: []
    },
    drafts : {
        type: [
            {
                username:{
                    type: String
                },
                subject: {
                    type: String,
                    default: ""
                },
                description: {
                    type: String,
                    default: ""
                },
                media: {
                    type: String,
                    default: ""
                },
                date: {
                    type: String,
                    default: ""
                },
                start_time: {
                    type: String,
                    default: ""
                },
                end_time: {
                    type: String,
                    default: ""
                },
                location: {
                    type:String,
                    default: ""
                },
                color: {
                    type:String,
                    default: "#FFFFFF"
                },
            }
        ],
        default: []
    }

}, { timestamps: true });

const User = models.User || mongoose.model("User", userSchema);

export default User;