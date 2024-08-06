"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from "next/image";
import { useSession } from 'next-auth/react';
import { signOut } from "next-auth/react";
import Halfsquare from './Halfsquare';

const Nav = ({setMain, mainColor, setBorder, borderColor, handleColor}) => {

  const { data: session } = useSession();
  const [ toggleDropDown, setDropDown ] = useState(false);
  const [ mainChoice, setChoice ] = useState(true);

  return (
    <nav className={`flex-between w-full py-5 pl-20 pr-16 bg-[${borderColor}]`}>
      <Link href="/Home" className='flex flex-center'>
        <Image src = "/logo-black.svg"
                  width = {200} 
                  height = {200}
                  className="object-contain"/>
      </Link>

      <div className='flex gap-2 flex-center relative'>
        <Link href="/Home" className='z-[3] pt-8'>
              <div className='bg-black size-[67px] rounded-full'>

              </div>
        </Link>
        <Image
          src={session?.user.image}
          width={67}
          height={67}
          className='rounded-full border-black border-[5px] cursor-pointer z-[3] mr-5 mt-8'
          alt='profile'
          onClick={() => {
            setDropDown(!toggleDropDown);
          }}
        />
        {toggleDropDown && (
          <div className='dropdown flex-center shadow-xl z-[2]'>
              <div className='flex flex-col px-4 pb-4 flex-center gap-2'>
                <h1 className='text-2xl font-bold pt-20'>Theme</h1>
                <ul className='flex flex-wrap gap-1 flex-center'>
                  <Halfsquare left_color = "#000000" right_color = "#222831" onClick={() => {mainChoice ? setMain("#000000") : setBorder("#222831")}}/>
                  <Halfsquare left_color = "#F1E5CB" right_color = "#467264" onClick={() => {mainChoice ? setMain("#F1E5CB") : setBorder("#467264")}}/>
                  <Halfsquare left_color = "#000000" right_color = "#90A6EB" onClick={() => {mainChoice ? setMain("#000000") : setBorder("#90A6EB")}}/>
                  <Halfsquare left_color = "#F1E5CB" right_color = "#F28166" onClick={() => {mainChoice ? setMain("#F1E5CB") : setBorder("#F28166")}}/>
                  <Halfsquare left_color = "#B4C3F2" right_color = "#FFFFFF" onClick={() => {mainChoice ? setMain("#B4C3F2") : setBorder("#FFFFFF")}}/>
                  <Halfsquare left_color = "#720455" right_color = "#FFFCAA" onClick={() => {mainChoice ? setMain("#720455") : setBorder("#FFFCAA")}}/>
                  <Halfsquare left_color = "#FFFFFF" right_color = "#222831" onClick={() => {mainChoice ? setMain("#FFFFFF") : setBorder("#222831")}}/>
                  <Halfsquare left_color = "#FFC95F" right_color = "#F1E5CB" onClick={() => {mainChoice ? setMain("#FFC95F") : setBorder("#F1E5CB")}}/>
                </ul>
                <p>Border Color {borderColor}</p>
                <p>Main Color {mainColor}</p>
                <button className='blue_btn' onClick={() => {handleColor}}>Set Color</button>
              </div>
              <div className='border-t-[3px] border-[#90A6EB] w-full rounded_corners'>

              </div>

              <div className='flex flex-center flex-col gap-2 mt-2 mb-20'>
                <h1 className='text-2xl font-bold'>Account</h1>
                <div className='profile_info'>
                    {session?.user?.name}
                </div>
                <div className='profile_info'>
                    password
                </div>
                <button className='blue_btn'onClick={() => {signOut()}}>
                    Log Out
                </button>
              </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Nav