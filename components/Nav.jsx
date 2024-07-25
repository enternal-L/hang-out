"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from "next/image";

const Nav = () => {
  return (
    <nav className='flex-between w-full mb-16 pt-3 px-4'>
      <Link href="/" className='flex flex-center'>
        <Image src = "/logo.svg"
                  width = {150} 
                  height = {150}
                  className="object-contain"/>
      </Link>

      <div className='flex gap-2'>
        <Link href="/" className=''>Create Post</Link>
        <Link href="/" className=''>Profile</Link>
      </div>
    </nav>
  )
}

export default Nav