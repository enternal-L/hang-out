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
}, { timestamps: true });

const User = models.User || mongoose.model("User", userSchema);

export default User;