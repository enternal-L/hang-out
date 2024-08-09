import Event from "@models/event";
import { connectDB } from "@utils/mongodb";

const searchExist = (event, user) => {
    return event.attendees.some(search => user._id == search.user._id); //some is like c++'s findif and the inside is a lambda function
};

export const PATCH = async(req, { params }) => {
    try {
        await connectDB();

        const { user, answer } = await req.json();

        const event = await Event.findById(params.id);

        if(!event.attendees){
            event.attendees = [];
        }

        if(searchExist(event, user)){
            return new Response("User already invited", {status : 200});
        }

        event.attendees.push({user, answer});

        await event.save();

        return new Response(`${user.username} invited`, {status : 200});
    }catch(error){
        return new Response("Failed to fetch searched users", {status : 500});
    }
}