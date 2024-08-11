"use client"
import Feed from "@components/Feed";
import Nav from "@components/Nav";
import { colorArr } from "@components/Nav";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState } from "react";

const Home = () => {
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


  return (
    <>
      <Nav setMain = {setMain} mainColor = {mainColor} setBorder={setBorder} borderColor = {borderColor} setBlackLogo = {setBlackLogo} blackLogo = {blackLogo}/>
      <div className={`w-full h-full flex-col flex-center px-11`} style={{ backgroundColor: borderColor }}>
        <div className={`w-full h-full flex-col rounded_corners flex-center`} style={{ backgroundColor: mainColor }}>
          <Feed />
          <Link href = "/Home/Create" className="flex flex-center w-[65px] h-[65px] right-16 bottom-4 fixed rounded-full bg-white text-6xl font-bold">+</Link>
        </div>
      </div>
    </>
  )
}

export default Home