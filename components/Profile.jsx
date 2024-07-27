"use client"

import {signOut} from "next-auth/react"

const Profile = () => {
  return (
    <>
        <div className='flex flex-row'>
            <h1>Account</h1>
            <Image src = "/logo-white.png"
                        width = {50} 
                        height = {50}
                        className="object-contain"/>
            <div>
                Name:
            </div>
            <button onClick={() => {signOut()}}>
                Log Out
            </button>
        </div>
    </>
  )
}

export default Profile