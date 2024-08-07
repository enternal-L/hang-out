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
  const [ blackLogo, setBlackLogo ] = useState(true);

  return (
    <nav className={`flex-between w-full py-5 pl-20 pr-16`} style={{ backgroundColor: borderColor }}>
      <Link href="/Home" className='flex flex-center'>
        <Image src = {blackLogo ? "/logo-black.svg" : "/logo-white.png"}
                  width = {200} 
                  height = {200}
                  className="object-contain"
                  alt='logo'/>
      </Link>

      <div className='flex gap-2 flex-center relative'>
        <Link href="/Home" className='z-[3] pt-8'>
              <div className='bg-black size-[67px] rounded-full'>

              </div>
        </Link>
        <Image
          src={session?.user.image ? session?.user.image : "/default-icon.PNG"}
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
              <div className='flex flex-col pb-2 flex-center gap-2'>
                <h1 className='text-2xl font-bold pt-20 px-4'>Theme</h1>
                <ul className='flex flex-wrap gap-2 flex-center'>
                  <Halfsquare left_color = "#000000" right_color = "#222831" setMain={setMain} setBorder={setBorder} selection={1} setBlackLogo={setBlackLogo}/>
                  <Halfsquare left_color = "#F1E5CB" right_color = "#467264" setMain={setMain} setBorder={setBorder} selection={2} setBlackLogo={setBlackLogo}/>
                  <Halfsquare left_color = "#FFFFFF" right_color = "#90A6EB" setMain={setMain} setBorder={setBorder} selection={2} setBlackLogo={setBlackLogo}/>
                  <Halfsquare left_color = "#F1E5CB" right_color = "#F28166" setMain={setMain} setBorder={setBorder} selection={2} setBlackLogo={setBlackLogo}/>
                  <Halfsquare left_color = "#B4C3F2" right_color = "#FFFFFF" setMain={setMain} setBorder={setBorder} selection={1} setBlackLogo={setBlackLogo}/>
                  <Halfsquare left_color = "#720455" right_color = "#FFFCAA" setMain={setMain} setBorder={setBorder} selection={1} setBlackLogo={setBlackLogo}/>
                  <Halfsquare left_color = "#FFFFFF" right_color = "#222831" setMain={setMain} setBorder={setBorder} selection={2} setBlackLogo={setBlackLogo}/>
                  <Halfsquare left_color = "#FFC95F" right_color = "#F1E5CB" setMain={setMain} setBorder={setBorder} selection={1} setBlackLogo={setBlackLogo}/>
                </ul>
                <button className='blue_btn' onClick={() => {}}>Set Color</button>
              </div>
              <div className='border-t-[3px] border-[#90A6EB] w-full rounded_corners'>

              </div>

              <div className='flex flex-center flex-col gap-2 mt-2 mb-20'>
                <h1 className='text-2xl font-bold'>Account</h1>
                <div className='profile_info'>
                    {session?.user?.name ? session?.user?.name : "loading..."}
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