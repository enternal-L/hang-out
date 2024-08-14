import { connectDB } from "@utils/mongodb";
import User from "@models/user";

export const POST = async(request, { params }) => {

    const {subject, description, media, date, start_time, end_time, location, color} = await request.json();

    try{
        await connectDB();

        const user = await User.findById(params.id);

        user.drafts.push({subject, description, media, date, start_time, end_time, location, color})

        user.save();

        return new Response("Successfully pushed drafts", {status : 200})
    } catch(error){
        return new Response("Pushing drafts error occured", {status : 500})
    }
}

export const DELETE = async({params}) => {
    try{
        await connectDB();

        User.findByIdAndDelete(params.id);

        return new Response("Successfully deleted drafts", {status : 200})
    } catch(error){
        return new Response("Draft Deletion error occured", {status : 500})  
    }
}