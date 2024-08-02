import { connectDB } from "@utils/mongodb";
import Event from "@models/event";

// GET (read)
export const GET = async (req, { params }) => {
    try{
        await connectDB();

        const events = await Event.findById(params.id).populate('creator');

        if(!events){
            return new Response("Event not found", { status : 404 });
        }

        return new Response(JSON.stringify(events), {status : 200});
    }catch(error){
        return new Response("Failed to fetch all events", {status : 500});
    }
}

// PATCH (update)
export const PATCH = async (request, { params }) => {
    const { subject, description, media, date, location } = await request.json();

    try{
        await connectDB();

        const existingEvent = await Event.findById(params._id);

        if(!existingEvent){
            return new Response("Event not found", { status : 404 });
        }

        existingEvent.subject = subject;
        existingEvent.description = description;
        existingEvent.media = media;
        existingEvent.date = date;
        existingEvent.location = location;

        await existingEvent.save();

        return new Response(JSON.stringify(existingEvent), { status: 200 })
    } catch(error){
        return new Response("Failed to update event"), { status: 500 }
    }
}

// DELETE (delete)
export const DELETE = async(request, { params }) => {
    try{
        await connectDB();

        await Event.findByIdAndDelete(params._id);

        return new Response("Eventdeleted successfully", { status : 200 });
    }catch(error){
        return new Response("Failed to delete event", { status : 500 });
    }
}