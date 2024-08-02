"use client"
import { useState } from 'react'
import Form from "@components/Form"
import Nav from '@components/Nav'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

const Editing = () => {
    const router = useRouter();
    const {data: session} = useSession();

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        subject: '',
        media: '',
        description: ''
    })

    const CreateEvent = async (e) => {
        //TODO
        e.preventDefault();
        setSubmitting(true);

        try{
            const response = await fetch("/api/prompt/new", {
                method: "POST",
                body: JSON.stringify({
                    userId: session?.user.id,
                    subject: post.subject,
                    media: post.media,
                    description: post.description
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
            <Nav />
            <Form
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={CreateEvent}
            />
        </>
    )
}

export default Editing