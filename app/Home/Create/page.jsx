"use client"
import { useState } from 'react'
import Form from "@components/Form"
import Nav from '@components/Nav'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

const Creating = () => {
    const router = useRouter();
    const {data: session} = useSession();

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        subject: '',
        media: '',
        description: ''
    })

    const CreatePrompt = async (e) => {
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
            console.log(error);
        }
        finally{
            setSubmitting(false);
        }
        //
    };

    return (
        <>
            <Nav />
            <Form
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={CreatePrompt}
            />
        </>
    )
}

export default Creating