"use client"
import { useState } from 'react'
import Form from "@components/Form"
import Nav from '@components/Nav'

const Creating = () => {
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        subject: '',
        media: '',
        description: ''
    })

    const CreatePrompt = async () => {

    }

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