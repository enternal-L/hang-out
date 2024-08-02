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
    <div className="w-full h-full flex-center flex-col bg-slate-200">
      <Image src = "/splash-blue.png"
                  width = {470} 
                  height = {470}
                  className="object-contain"/>
      <div className="w-full login_container">
        <nav className="flex flex-col custom_color rounded-3xl w-full h-full gap-4 py-5 px-[20%] drop-shadow-2xl">
          <input
                  type = "text"
                  placeholder='Username'
                  onChange={(e) => {setUser(e.target.value)}}
                  required
                  className='form_input outline-none'
          />
          <input
                  type = {(showPass) ? ("") : ("password")}
                  placeholder='Password'
                  onChange={(e) => {setPassword(e.target.value)}}
                  required
                  className='form_input outline-none'/>

          <span className="flex flex-row gap-2 items-center"><input className="size-5"type="checkbox" onChange={() => {setShow(!showPass)}}></input>Show Password</span>

          <div className="w-full flex flex-row flex-center gap-3">
                <button type = "submit" onClick={handleSignIn} className="blue_btn text-base mt-4 w-full min-h-6">
                    Sign In
                </button>

                {/* when phone screen break these two into rows */}

                <button type = "submit" onClick={handleSignUp} className="blue_btn text-base mt-4 w-full min-h-6">
                    Sign Up
                </button>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default SignUp