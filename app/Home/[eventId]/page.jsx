"use client"

import { useEffect, useState } from "react"
import Nav from "@components/Nav";
import { colorArr } from "@components/Nav";
import Image from "next/image";

const EventPage = ( { params } ) => {

    const [post, setPost] = useState({}); //empty object

    let _mainColor = "#90A6EB";
    let _borderColor = "#FFFFFF";
    let _blackLogo = true;

    const optionArr = ["All day", "Breakfast", "Lunch", "Dinner", "Late"];

    const [mainColor, setMain] = useState(_mainColor);
    const [borderColor, setBorder] = useState(_borderColor);
    const [blackLogo, setBlackLogo ] = useState(_blackLogo);

    const fetchEvent = async() => {
        const response = await fetch(`/api/prompt/${params.eventId}`)
        const data = await response.json();
        setPost(data);
    }

    useEffect(() => {

        if(typeof window !== "undefined"){
            const savedColor = window.localStorage.getItem("saved-theme");
            const parsedSavedColor = JSON.parse(savedColor);
    
            if(parsedSavedColor){
                _mainColor = colorArr[parsedSavedColor.colorIndex][1];
                _borderColor = colorArr[parsedSavedColor.colorIndex][0];
                _blackLogo = parsedSavedColor.colorIndex < 4 ? false : true;
            }
        }

        fetchEvent();
    }, [params])


    return (
        <>
            <Nav setMain = {setMain} mainColor = {mainColor} setBorder={setBorder} borderColor = {borderColor} blackLogo={blackLogo} setBlackLogo={setBlackLogo}/>
            <div className={`w-full h-auto flex-col flex-center px-11`} style={{ backgroundColor: borderColor }}>
                <div className={`w-full h-full flex flex-col rounded_corners flex-start gap-24`} style={{ backgroundColor: post.color }}>
                    <div className="flex flex-col pt-8 px-12 flex-center w-full h-20">
                        <div className="flex flex-row justify-between w-full">
                                <div className="flex items-center gap-1 w-full">
                                    <Image  
                                    src = "/default-icon.PNG"
                                    alt="profile"
                                    width = {30} 
                                    height = {30}
                                    className="object-contain rounded-full border-black"/>
                                    <p className="font-semibold text-sm">username</p>
                                </div>
                                <div className="flex justify-end w-full items-center">
                                    <Image alt="dropdown" src="/menu.svg" width={20} height={20}className="cursor-pointer z-[1]"></Image>
                                </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-col px-80 gap-5">
                        <h1 className="text-5xl font-bold">{post.subject ? post.subject : "Loading..."}</h1>
                        <div className="w-full flex flex-row gap-48">
                            <div className="w-full flex flex-start flex-col gap-2">
                                <p className="flex size-full">Description talking about the event 
                                    and stuff yeah uhuh you know what it is 
                                    Description talking about the event and 
                                    stuff yeah uhuh you know what it is Description 
                                    talking about the event and stuff yeah 
                                    uhuh you know what it isDescription talking 
                                    about the event and stuff yeah uhuh you know what it is 
                                    Description talking about the event and stuff yeah uhuh you 
                                    know what it isDescription talking about the event and stuff
                                yeah uhuh you know what it is</p>
                            </div>
                            <div className="w-full flex flex-col justify-center gap-3">
                                <div className="flex flex-row gap-3 flex-start">
                                        <p className="bg-[#FFC95F] rounded-md w-[40%] p-2 flex-center">{post.attendees ? `${post.attendees.length} attending` : "Loading..."}</p>
                                        <p className="bg-[#FFC95F] rounded-md w-[35%] p-2 flex-center">{post.date ? post.date.split('T')[0] : "Loading..."}</p>
                                </div>
                                <div className="flex flex-row gap-5 flex-start">
                                        <p className="bg-[#FFC95F] rounded-md w-fit min-w-36 p-2 flex-center">{post.start_time && post.end_time ? `${post.start_time} - ${post.end_time}` : "Loading..."}</p>
                                </div>
                                <div className="flex flex-row gap-5 flex-start">
                                        <p className="bg-[#FFC95F] rounded-md min-w-72 p-2 flex-center">{post.location ? post.location : "Loading..."}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-fit flex flex-center px-56">
                        <div className="w-full h-full rounded-xl border-2 border-black flex-row flex flex-center">
                            <div className="w-full flex-center flex">
                                Calendar
                            </div>
                            <div className=" w-full flex-center flex-col flex gap-4 py-32">
                                {optionArr.map((item, index) => (
                                    <div className="flex flex-center flex-row gap-4">
                                        <label key = {index} className = "flex flex-row gap-5 rounded-md bg-white p-2 w-40 px-5">
                                            <input type="checkbox" checked="checked" className="size-4 self-center"/>
                                            <div className="text-center px-2">
                                                <p className="text-md">{item}</p>
                                            </div>
                                        </label>
                                        <div>
                                            <p>List</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-center w-full px-36">
                        <div className="rounded-md h-0 border-[#FFB800] border-4 w-full">
                            
                        </div>
                    </div>
                    <div className="w-full flex flex-center">
                        posts
                    </div>
                </div>
            </div>
        </>
    )
}

export default EventPage