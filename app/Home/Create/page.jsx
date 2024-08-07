"use client"
import { useState } from 'react'
import Form from "@components/Form"
import Nav from '@components/Nav'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

const Creating = () => {
    const router = useRouter();
    const {data: session} = useSession();
    const [mainColor, setMain] = useState("#90A6EB");
    const [borderColor, setBorder] = useState("#FFFFFF");

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        subject: '',
        media: '',
        description: '',
        location: '',
        date: '',
        start_time: '',
        end_time: '',
        color: ''
    })

    const CreateEvent = async (e) => {
        //TODO
        e.preventDefault();
        setSubmitting(true);

        {console.log(post);}

        try{
            const response = await fetch("/api/prompt/new", {
                method: "POST",
                body: JSON.stringify({
                    userId: session?.user.id,
                    subject: post.subject,
                    media: post.media,
                    description: post.description,
                    location: post.location,
                    date: post.date,
                    start_time: post.start_time,
                    end_time: post.end_time,
                    color: post.color
                })
            });

            if (response.ok){
                router.push("/");
            }
        }
        catch (error){
            console.log("Error occured" , error);
        }
        finally{
            setSubmitting(false);
        }
    };

    return (
        <>
            <Nav setMain = {setMain} mainColor = {mainColor} setBorder={setBorder} borderColor = {borderColor}/>
            <Form
                type="Publish"
                post={post}
                setPost={setPost}
                submitting={submitting}
                handleSubmit={CreateEvent}
                mainColor={mainColor}
                borderColor={borderColor}
            />
        </>
    )
}

export default Creating