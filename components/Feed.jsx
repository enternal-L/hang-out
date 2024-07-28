"use client";
import {useState, useEffect} from "react"
import Image from "next/image";

const Feed = () => {

  const peopleCount = 0;


  return (
    <div className="prompt_card">
      <Image src = "logo-black.svg"
                  width = {100} 
                  height = {100}
                  className="object-contain"/>
      <h1>Title</h1>
      <p>Description</p>
      <div className="flex flex-row gap-5">
        <p className="rounded_corners border-solid">{peopleCount} attending</p>
        <p className="rounded_corners border-solid">Date:</p>
      </div>
    </div>
  )
}

export default Feed