"use client"

import { useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
const EventCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {

    {console.log(post)};

    const peopleCount = 0;

    return (
            <div className="bg-white w-[30%] h-fit my-8">
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
                            className="object-contain rounded-full border-black border-[1px]"/>
                            <p className="font-semibold text-sm">{post.creator.username}</p>
                        </div>
                        <div className="flex justify-end w-full items-center">
                            <span>three dots</span>
                        </div>
                    </div>
                </div>
                <div className="">
                    <h1 className="text-4xl items-center p-2 font-semibold">{post.subject}</h1>
                    <p className="px-3">{post.description}</p>
                </div>
                <div className="flex flex-row gap-5 flex-center m-3">
                        <p className="custom_color rounded-md w-full p-2 flex-center">{peopleCount} attending</p>
                        <p className="custom_color rounded-md w-full p-2 flex-center">Date:</p>
                </div>
            </div>
    )
}

export default EventCard