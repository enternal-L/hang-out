"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from "next/image";

const Nav = () => {
  return (
    <nav className='flex-between w-full py-5 px-20 bg-white'>
      <Link href="/Home" className='flex flex-center'>
        <Image src = "/logo-black.svg"
                  width = {200} 
                  height = {200}
                  className="object-contain"/>
      </Link>

      <div className='flex gap-2'>
        <Link href="/Home/Create" className=''>Create Post</Link>
        <Link href="/Home/Profile" className=''>Profile</Link>
      </div>
    </nav>
  )
}

export default Nav