import { connectDB } from "@utils/mongodb";
import User from "@models/user";

const searchArray = (id, drafts) => {
    for(let i = 0; i < drafts.length; ++i){
        if(id == drafts[i]){
            return i;
        }
    }

    return -1;
}

export const POST = async(request, { params }) => {

    const {username, subject, description, media, date, start_time, end_time, location, color} = await request.json();

    try{
        await connectDB();

        const user = await User.findById(params.id);

        user.drafts.push({username, subject, description, media, date, start_time, end_time, location, color});

        await user.save();

        return new Response("Successfully pushed drafts", {status : 200})
    } catch(error){
        return new Response("Pushing drafts error occured", {status : 500})
    }
}

export const DELETE = async({params}) => {
    try{
        await connectDB();

        const user = await User.findById(params.id);

        return new Response("Successfully deleted drafts", {status : 200})
    } catch(error){
        return new Response("Draft Deletion error occured", {status : 500})  
    }
}