"use client"

import Link from "next/link";
import Image from "next/image";
import { useState } from 'react'
import { useRouter } from "next/navigation";

const SignIn = () => {
  
  const router = useRouter();
  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();

    if(!username || !password){
       alert("Both fields are required");
       return;
    }

    try{
      const res = await fetch('api/register', {
        method: 'POST',
        body: JSON.stringify({
            username,
            password
        })
      });

      if(res.ok){
        router.push("/Home");
      }

      else{
        console.log("Signin Failed");
      }

    } catch (error){
        console.log('Error during signin: ', error);
    }
  }
  
  
  return (
    <div className="w-full h-full flex-center flex-col custom_color">
      <Image src = "/logo-white.png"
                  width = {470} 
                  height = {470}
                  className="object-contain"/>
      <div className="w-full login_container">
        <nav className="flex flex-col bg-white rounded-3xl w-full h-full gap-4 py-5 px-28 shadow-xl">
          <input
                  type = "text"
                  placeholder='Username'
                  onChange={(e) => {setUser(e.target.value)}}
                  required
                  className='form_input outline-none'
          />
          <input
                  type = "password"
                  placeholder='Password'
                  onChange={(e) => {setPassword(e.target.value)}}
                  required
                  className='form_input outline-none'
          />
          <button type = "submit" onClick={handleSubmit} className="blue_btn text-base mt-4">
              Sign In
          </button>
        </nav>
      </div>
    </div>
  )
}

export default SignIn