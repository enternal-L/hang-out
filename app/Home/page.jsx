"use client"

import Feed from "@components/Feed";
import Nav from "@components/Nav";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

const Home = () => {

  const { data: session } = useSession();
  // const userId = session?.user.id;
  const [mainColor, setMain] = useState("#90A6EB");
  const [borderColor, setBorder] = useState("#FFFFFF");
  
  // useEffect(() => {
  //   const getColor = async() => {
  //     const response = await fetch(`/api/user/${userId}`);
  //     const data = await response.json();

  //     setMain(data.main_color);
  //     setBorder(data.border_color);

  //     console.log("Got color!")
  //   }

  //   if(userId) getColor();
  // }, [userId]);

  const updateColor = () => {
    // try {
    //     const response = await fetch(`/api/prompt/${eventId}`, {
    //       method: "PATCH",
    //       body: JSON.stringify({
    //           main_color: mainColor,
    //           border_color: borderColor
    //         })
    //     });

    //     if(response.ok){
    //       console.log("Update successfully");
    //     }

    // } catch (error) {
    //     console.log("Error occured" , error);
    // }
  };

  return (
    <>
      <Nav setMain = {setMain} mainColor = {mainColor} setBorder={setBorder} borderColor = {borderColor} handleColor={updateColor}/>
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