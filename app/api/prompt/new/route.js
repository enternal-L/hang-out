import {connectToDB} from "@utils/mongodb";
import prompt from "@models/prompt";

export const POST = async (request) => {
    const {userId, prompt, subject, media, description} = await request.json();

    try{
        await connectToDB();
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            subject,
            media,
            description
        });

        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt), {status: 201});
    }
    catch(error) {
        return new Response("Failed to create new prompt", {status: 500});
    }
}