"use client"

import { useEffect, useState } from "react"
import Nav from "@components/Nav";
import { colorArr } from "@components/Nav";

const EventPage = ( { params } ) => {

    const [eventInfo, setEvent] = useState({}); //empty object

    let _mainColor = "#90A6EB";
    let _borderColor = "#FFFFFF";
    let _blackLogo = true;

    const [mainColor, setMain] = useState(_mainColor);
    const [borderColor, setBorder] = useState(_borderColor);
    const [blackLogo, setBlackLogo ] = useState(_blackLogo);

    const fetchEvent = async() => {
        const response = await fetch(`/api/prompt/${params.eventId}`)
        const data = await response.json();
        setEvent(data);
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
            <div></div>
        </>
    )
}

export default EventPage