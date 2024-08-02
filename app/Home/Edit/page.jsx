"use client"
import { useState, useEffect } from 'react'
import Form from "@components/Form"
import Nav from '@components/Nav'
import { useRouter, useSearchParams } from 'next/navigation'

const Editing = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const eventId = searchParams.get('id')

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        subject: '',
        media: '',
        description: ''
    })

    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${eventId}`);
            const data = await response.json();

            setPost({
                subject: data.subject,
                media: data.media,
                description: data.description
            }) 
        }

        if(eventId) getPromptDetails();
    }, [eventId]);

    {console.log(eventId)}

    const updatePrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);
    
        if (!eventId) return alert("Missing EventId!");
    
        try {
          const response = await fetch(`/api/prompt/${promptId}`, {
            method: "PATCH",
            body: JSON.stringify({
              
            }),
          });
    
          if (response.ok) {
            router.push("/");
          }
        } catch (error) {
          console.log(error);
        } finally {
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
            handleSubmit={updatePrompt}
            />
        </>
    )
}

export default Editing