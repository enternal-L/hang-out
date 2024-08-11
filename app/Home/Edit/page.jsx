"use client"
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { colorArr } from "@components/Nav";
import Form from "@components/Form"
import Nav from '@components/Nav'

const Editing = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const eventId = searchParams.get('id');

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
        subject: 'loading...',
        media: '',
        description: 'loading...',
        location: 'loading...',
        date: '0000-00-00',
        start_time: '00:00',
        end_time: '00:00',
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
            start_time: data.start_time,
            end_time: data.end_time,
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
                start_time: post.start_time,
                end_time: post.end_time,
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
            <Nav setMain = {setMain} mainColor = {mainColor} setBorder={setBorder} borderColor = {borderColor} blackLogo={blackLogo} setBlackLogo={setBlackLogo}/>
            <Form
              type="Save"
              post={post}
              setPost={setPost}
              submitting={submitting}
              handleSubmit={updateEvent}
              mainColor={mainColor}
              borderColor={borderColor}
            />
        </>
    )
}

export default Editing