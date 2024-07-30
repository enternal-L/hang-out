import User from "@models/user";
import { connectDB } from "@utils/mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
     try{
        await connectDB();
        const { username } = await req.json();
        const user = await User.findOne({username}).select("_id");

        return NextResponse.json({ user });
     }
     catch(error){
        console.log("Error Occured" , error)
     }
}