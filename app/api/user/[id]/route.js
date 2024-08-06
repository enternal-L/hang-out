import { connectDB } from "@utils/mongodb";
import User from "@models/user";

export const GET = async (req, { params }) => {
    try{
        await connectDB();

        const user = await User.findById(params.id);

        if(!user){
            return new Response("User not found", { status : 404 });
        }

        return new Response(JSON.stringify(user), {status : 200});
    }catch(error){
        return new Response("Failed to fetch user", {status : 500});
    }
}

// PATCH (update)
export const PATCH = async (request, { params }) => {
    const { main_color, border_color } = await request.json();

    try{
        await connectDB();

        const user = await User.findById(params.id);

        if(!user){
            return new Response("User not found", { status : 404 });
        }

        user.main_color = main_color;
        user.border_color = border_color;

        await user.save();

        return new Response("User updated successfully", { status: 200 })
    } catch(error){
        return new Response("User failed to update", { status: 500 })
    }
}