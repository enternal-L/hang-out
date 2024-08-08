import { connectDB } from "@utils/mongodb";
import User from "@models/user";

//our req needs to be onChange input which searches user on the database

export const SearchUser = async(req) => {
    try {
        await connectDB();

        const { query } = req.query;

        const users = User.find({
            username: { $regex: query, $options: 'i' }, // case-insensitive search
        }) //no limit on searches

        return new Response(JSON.stringify(users), {status : 200});
    }catch(error){
        return new Response("Failed to fetch searched users", {status : 500});
    }
}