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

export const DELETE = async(request, {params}) => {
    try{
        await connectDB();

        const user = await User.findById(params.id);

        const index = searchArray(params.subId, user.drafts);

        index == -1 ? user.drafts.splice(index, 1) : console.log("Draft Not Found");

        await user.save();

        return new Response("Successfully deleted drafts", {status : 200})
    } catch(error){
        return new Response("Draft Deletion error occured", {status : 500})  
    }
}