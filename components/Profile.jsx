"use client"

import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react"

import Image from "next/image"

const Profile = () => {

    const { data: session } = useSession();

    const loaderProp =({ src }) => {
        return src;
    }

    return (
        <>
            <div className='flex flex-row'>
                <h1>Account</h1>
                <Image src = {session?.user?.image}
                            width = {50} 
                            height = {50}
                            className="object-contain"
                            loader={loaderProp}
                            />
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