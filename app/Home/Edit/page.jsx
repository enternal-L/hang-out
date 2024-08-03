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
            date: data.date?.split('T')[0],
            time: data.time,
            color: data.color
          })
        }

        if(eventId) getEventDetails();
    }, [eventId])

    return (
        <>
            <Nav />
            <Form
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={() => {}}
            />
        </>
    )
}

export default Editing