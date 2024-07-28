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

  //sign-in part
  const handleSignIn = async(e) => {
      e.preventDefault();

      // if(!username || !password){
      //     alert("Both fields are required");
      //     return;
      // }

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

      } catch (error){
          console.log("Error Occured", error)
      }
  }
  
  return (
    <div className="w-full h-full flex-center flex-col custom_color">
      <Image src = "/logo-white.png"
                  width = {470} 
                  height = {470}
                  className="object-contain"/>
      <div className="w-full login_container">
        <nav className="flex flex-col bg-white rounded-3xl w-full h-full gap-4 py-5 px-[20%] shadow-xl">
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

          <div className="w-full flex flex-row flex-center gap-3">
                <button type = "submit" onClick={handleSignIn} className="blue_btn text-base mt-4 w-full">
                    Sign In
                </button>

                {/* when movie break these two into rows */}

                <button type = "submit" onClick={handleSignUp} className="blue_btn text-base mt-4 w-full">
                    Sign Up
                </button>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default SignUp