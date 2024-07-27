import { connectDB } from "@utils/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@models/user";

export async function POST(req){
    try{
        const {username, password} = await req.json();
        const hashedPass = await bcrypt.hash(password, 10);

        await connectDB();

        await User.create({username, password: hashedPass});

        return NextResponse.json({ message: "User registered"}, { status : 201 })
    }
    catch(error){
        console.log("Error in API ", error);
        return NextResponse.json({ message: "An error occured"}, {status : 500 })
    }
}