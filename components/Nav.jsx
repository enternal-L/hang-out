"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from "next/image";
import { useSession } from 'next-auth/react';

const Nav = () => {

  const { data: session } = useSession();
  const [ toggleDropDown, setDropDown ] = useState(false);

  return (
    <nav className='flex-between w-full py-5 px-20 bg-white'>
      <Link href="/Home" className='flex flex-center'>
        <Image src = "/logo-black.svg"
                  width = {200} 
                  height = {200}
                  className="object-contain"/>
      </Link>

      <div className='flex gap-2 flex-center relative'>
        <Link href="/Home/Create" className=''>
              <div className='bg-black size-[67px] rounded-full'>

              </div>
        </Link>
        <Image
          src={session?.user.image}
          width={67}
          height={67}
          className='rounded-full border-black border-[5px] cursor-pointer'
          alt='profile'
          onClick={() => {
            setDropDown(!toggleDropDown);
          }}
        />
        {toggleDropDown && (
          <div className='dropdown'>
              <h1>Account</h1>
              <div>
                  Name: {session?.user?.name}
              </div>
              <button className='blue_btn'onClick={() => {signOut()}}>
                  Log Out
              </button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Nav