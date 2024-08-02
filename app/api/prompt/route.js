import { connectDB } from "@utils/mongodb";
import Event from "@models/event";

export const GET = async (req, { params }) => {
    try{
        await connectDB();

        const events = await Event.find().populate('creator');

        return new Response(JSON.stringify(events), {status : 200});
    }catch(error){
        return new Response("Failed to fetch all events", {status : 500});
    }
}