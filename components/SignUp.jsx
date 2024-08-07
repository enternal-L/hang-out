"use client"

import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from 'react'
import { useRouter } from "next/navigation";

const SignUp = () => {
  
  //Sign-up part
  const router = useRouter();
  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShow] = useState(false);

  const handleSignUp = async(e) => {
    e.preventDefault();

    if(!username || !password){
       alert("Both fields are required");
       return;
    }

    try{

      const resUE = await fetch('api/userExists', {
        method: 'POST',
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
            username
        })
      });

      const { user } = await resUE.json();

      if(user){
        alert("User already Exists");
        return;
      }

      const res = await fetch('api/register', {
        method: 'POST',
        body: JSON.stringify({
            username,
            password,
        })
      });

      if(res.error){
        console.log("Signin Failed");
      }

      router.replace("Home");
      router.refresh();

    } catch (error){
        console.log('Error during signin: ', error);
    }
  }

  //sign-in part
  const handleSignIn = async(e) => {
      e.preventDefault();

      if(!username || !password){
          alert("Both fields are required");
          return;
      }

      try{
        const res = await signIn('credentials', {
            username, password,
            redirect: false
        });

        if(res.error){
          alert("Your username or password may be incorrect")
          return;
        }
        
        router.replace("Home");
        router.refresh();

      } catch (error){
          console.log("Error Occured", error)
      }
  }
  
  return (
    <div className="w-full h-full flex-center flex-row bg-white">
      <div className="w-[30%] flex-center self-end">
          <Image src = "/bird.PNG"
                      width = {450} 
                      height = {450}
                      className="object-contain"/>
      </div>
      <div className="w-[40%] flex flex-col gap-2 flex-center">
        <Image src = "/splash-blue.png"
                  width = {470} 
                  height = {470}
                  className="object-contain"/>
        <nav className="flex flex-col custom_color rounded-3xl w-[70%] gap-4 py-5 drop-shadow-2xl px-16 flex-center">
          <input
                  type = "text"
                  placeholder='Username'
                  onChange={(e) => {setUser(e.target.value)}}
                  required
                  className='form_input outline-none bg-white'
          />
          <input
                  type = {(showPass) ? ("") : ("password")}
                  placeholder='Password'
                  onChange={(e) => {setPassword(e.target.value)}}
                  required
                  className='form_input outline-none bg-white'
          />

          <span className="flex flex-row gap-2 items-center self-start"><input className="size-5"type="checkbox" onChange={() => {setShow(!showPass)}}></input>Show Password</span>

          <div className="w-full flex flex-row flex-center gap-3">
                <button type = "submit" onClick={handleSignIn} className="white_btn text-base mt-4 w-full min-h-6">
                    Sign In
                </button>

                {/* when phone screen break these two into rows */}

                <button type = "submit" onClick={handleSignUp} className="white_btn text-base mt-4 w-full min-h-6">
                    Sign Up
                </button>
          </div>
        </nav>
      </div>
      <div className="w-[30%] flex-center self-start">
          <Image src = "/mailman.PNG"
          width = {455} 
          height = {455}
          className="object-contain"/>
        </div>
    </div>
  )
}

export default SignUp