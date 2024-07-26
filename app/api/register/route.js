import { NextResponse } from "next/server";

export async function POST(req){
    try{
        const {username, password} = await req.json();

        console.log("Name: ", username);
        console.log("Password ", password);

        return NextResponse.json({ message: "User registered"}, { status : 201 })
    }
    catch(error){
        return NextResponse.json({ message: "An error occured"}, {status : 500 })
    }
}