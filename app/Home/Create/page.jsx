"use client"
import { useState } from 'react'
import Form from "@components/Form"
import Nav from '@components/Nav'
import { useRouter } from 'next/navigation'
import { colorArr } from "@components/Nav";
import { useSession } from 'next-auth/react'

const Creating = () => {
    const router = useRouter();
    const {data: session} = useSession();

    let _mainColor = "#90A6EB";
    let _borderColor = "#FFFFFF";
    let _blackLogo = true;

    if(typeof window !== "undefined"){
        const savedColor = window.localStorage.getItem("saved-theme");
        const parsedSavedColor = JSON.parse(savedColor);

        if(parsedSavedColor){
            _mainColor = colorArr[parsedSavedColor.colorIndex][1];
            _borderColor = colorArr[parsedSavedColor.colorIndex][0];
            _blackLogo = parsedSavedColor.colorIndex < 4 ? false : true;
        }
    }

    const [mainColor, setMain] = useState(_mainColor);
    const [borderColor, setBorder] = useState(_borderColor);
    const [blackLogo, setBlackLogo ] = useState(_blackLogo);

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
        e.preventDefault();
        setSubmitting(true);

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
            <Nav setMain = {setMain} mainColor = {mainColor} setBorder={setBorder} borderColor = {borderColor} blackLogo={blackLogo} setBlackLogo={setBlackLogo}/>
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