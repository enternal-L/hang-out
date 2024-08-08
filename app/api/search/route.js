import { connectDB } from "@utils/mongodb";
import User from "@models/user";

//our req needs to be onChange input which searches user on the database

export const POST = async(req, res) => {
    try {
        await connectDB();

        const { query } = await req.json();

        const users = await User.find({
            username: { $regex: query, $options: 'i' }, // case-insensitive search
        }) //no limit on searches

        return new Response(JSON.stringify(users), {status : 200});
    }catch(error){
        return new Response("Failed to fetch searched users", {status : 500});
    }
}