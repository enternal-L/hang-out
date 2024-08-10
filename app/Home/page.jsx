"use client"
import Feed from "@components/Feed";
import Nav from "@components/Nav";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState } from "react";

const Home = () => {
  const [mainColor, setMain] = useState("#90A6EB");
  const [borderColor, setBorder] = useState("#FFFFFF");

  return (
    <>
      <Nav setMain = {setMain} mainColor = {mainColor} setBorder={setBorder} borderColor = {borderColor}/>
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