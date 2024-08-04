"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from "next/image";
import { useSession } from 'next-auth/react';
import { signOut } from "next-auth/react";

const Nav = () => {

  const { data: session } = useSession();
  const [ toggleDropDown, setDropDown ] = useState(false);

  return (
    <nav className='flex-between w-full py-5 pl-20 pr-16 bg-white'>
      <Link href="/Home" className='flex flex-center'>
        <Image src = "/logo-black.svg"
                  width = {200} 
                  height = {200}
                  className="object-contain"/>
      </Link>

      <div className='flex gap-2 flex-center relative'>
        <Link href="/Home" className='z-[2] pt-8'>
              <div className='bg-black size-[67px] rounded-full'>

              </div>
        </Link>
        <Image
          src={session?.user.image}
          width={67}
          height={67}
          className='rounded-full border-black border-[5px] cursor-pointer z-[2] mr-5 mt-8'
          alt='profile'
          onClick={() => {
            setDropDown(!toggleDropDown);
          }}
        />
        {toggleDropDown && (
          <div className='dropdown flex-center shadow-xl'>
              <div className='flex flex-col px-4 flex-center gap-2'>
                <h1 className='text-2xl font-bold pt-20'>Theme</h1>
                <div className='flex flex-row gap-3'>
                  <button className='text-xl font-bold'>border</button>
                  <button className='text-xl font-bold'>main</button>
                </div>
                <ul className='flex flex-wrap gap-2 flex-center'>
                  <li>Color</li>
                  <li>Color</li>
                  <li>Color</li>
                  <li>Color</li>
                  <li>Color</li>
                  <li>Color</li>
                  <li>Color</li>
                  <li>Color</li>
                </ul>
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