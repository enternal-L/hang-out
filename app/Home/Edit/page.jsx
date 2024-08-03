"use client"
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import Form from "@components/Form"
import Nav from '@components/Nav'

const Editing = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const eventId = searchParams.get('id');

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        subject: '',
        media: '',
        description: '',
        location: '',
        date: '',
        time: '',
        color: ''
    });

    useEffect(() => {
        const getEventDetails = async() => {
          const response = await fetch(`/api/prompt/${eventId}`);
          const data = await response.json();

          setPost({
            subject: data.subject,
            description: data.description,
            location: data.location,
            date: data.date?.split('T')[0],
            time: data.time,
            color: data.color
          })
        }

        if(eventId) getEventDetails();
    }, [eventId]);

    const updateEvent = async (e) => {
      e.preventDefault();
      setSubmitting(true);
  
      if (!eventId) return alert("Missing eventId!");
  
      try {
          const response = await fetch(`/api/prompt/${eventId}`, {
            method: "PATCH",
            body: JSON.stringify({
                subject: post.subject,

                description: post.description,
                location: post.location,
                date: post.date,
                time: post.time,
                color: post.color
              })
          });
    
          if (response.ok) {
            router.push("/Home");
          }
      } catch (error) {
          console.log("Error occured" , error);
      } finally {
          setSubmitting(false);
      }
    };

    return (
        <>
            <Nav />
            <Form
            type="Save"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updateEvent}
            />
        </>
    )
}

export default Editing