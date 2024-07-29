"use client"

import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react"

import Image from "next/image"

const Profile = () => {

    const { data: session } = useSession();

    return (
        <>
            <div className='flex flex-row'>
                <h1>Account</h1>
                <Image src = "/logo-white.png"
                            width = {50} 
                            height = {50}
                            className="object-contain"/>
                <div>
                    Name: {session?.user?.name}
                </div>
                <button onClick={() => {signOut()}}>
                    Log Out
                </button>
            </div>
        </>
    )
}

export default Profile