"use client"

import { useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const EventCard = ({ post, color, handleTagClick, handleEdit, handleDelete, handleDropdown, dropDown }) => {

    const router = useRouter();
    const peopleCount = 0;

    return (
            <div className={`bg-[${color}] w-[30%] h-fit my-8 min-w-[250px] relative z-[1]`}>
                {dropDown && (
                    <div className='flex flex-end shadow-xl absolute z-[2] bg-white right-0'>
                        <div className='h-64 flex flex-col px-4 flex-center gap-2 pt-6'>
                            <p>Share</p>
                            <Image src = "/pen-square.svg" alt="edit" width = {50} height = {50}
                            className="object-contain cursor-pointer" onClick={handleEdit}/>
                            <p>Archive</p>
                            <p>Star</p>
                            <Image src = "/trashcan.svg" alt="delete" width = {50} height = {50} 
                            className="object-contain cursor-pointer" onClick={handleDelete}/>
                        </div>
                    </div>
                )}
                <div
                    className="object-contain w-full h-44"
                    style={{
                        backgroundImage: `url(${post.creator.image})`, // Set background image from post data
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                >
                    <div className="flex flex-row pt-2 px-2">
                        <div className="flex items-center gap-1 w-full">
                            <Image
                            src = {post.creator.image}
                            alt="profile"
                            width = {30} 
                            height = {30}
                            className="object-contain rounded-full border-black"/>
                            <p className="font-semibold text-sm">{post.creator.username}</p>
                        </div>
                        <div className="flex justify-end w-full items-center z-[3]">
                            <button className="" onClick={handleDropdown}>...</button>
                        </div>
                    </div>
                </div>
                <div className="">
                    <h1 className="text-4xl items-center p-2 font-semibold">{post.subject}</h1>
                    <p className="px-3">{post.description}</p>
                </div>
                <div className="flex flex-row gap-5 flex-center m-3">
                        <p className="bg-[#FFC95F] rounded-md w-full p-2 flex-center">{peopleCount} attending</p>
                        <p className="bg-[#FFC95F] rounded-md w-full p-2 flex-center">{post.date.split('T')[0]}, {post.time}</p>
                </div>
                <div className="flex flex-row gap-5 flex-center m-3">
                        <p className="bg-[#FFC95F] rounded-md w-full p-2 flex-center">{post.location}</p>
                </div>
            </div>
    )
}

export default EventCard