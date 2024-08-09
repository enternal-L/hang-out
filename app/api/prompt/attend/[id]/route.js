import Event from "@models/event";
import User from "@models/user";
import { connectDB } from "@utils/mongodb";

const searchExist = (event, user) => {
    return event.attendees.some(search => user._id == search.user._id); //some is like c++'s findif and the inside is a lambda function
};

export const PATCH = async(req, { params }) => {
    try {
        await connectDB();

        const { user, answer } = await req.json();

        const event = await Event.findById(params.id);
        const invited_user = await User.findById(user);

        if(!event.attendees){
            event.attendees = [];
        }

        if(!!invited_user.invites){
            invited_user.invites = [];
        }

        if(searchExist(event, user)){
            return new Response("User already invited", {status : 200});
        }

        invited_user.invites.push(event);
        event.attendees.push({user, answer});

        await event.save();

        return new Response(`${user.username} invited`, {status : 200});
    }catch(error){
        return new Response("Failed to fetch searched users", {status : 500});
    }
}