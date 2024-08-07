"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from "next/image";
import { useSession } from 'next-auth/react';
import { signOut } from "next-auth/react";
import Halfsquare from './Halfsquare';

const Nav = ({setMain, mainColor, setBorder, borderColor}) => {

  const { data: session } = useSession();
  const userId = session?.user.id;
  const [ toggleDropDown, setDropDown ] = useState(false);
  const [ blackLogo, setBlackLogo ] = useState(true);
  const [ colorSelected, setSelected ] = useState(-1);
  const colorArr = [
    ["#000000", "#222831"], ["#B4C3F2", "#FFFFFF"], ["#720455", "#FFFCAA"], ["#FFC95F", "#F1E5CB"], //white logos
    ["#F1E5CB", "#467264"], ["#FFFFFF", "#90A6EB"] , ["#F1E5CB", "#F28166"], ["#FFFFFF", "#222831"] //black logos
  ] //border color and main color

  useEffect(() => {
    const getColor = async() => {
      const response = await fetch(`/api/user/${userId}`);
      const data = await response.json();

      if(!data.colorIndex){
        updateColor(5);
      }

      else{
        setMain(colorArr[data.colorIndex][1]);
        setBorder(colorArr[data.colorIndex][0]);
      }
    }

    if(userId) getColor();
  }, [userId]);

  const updateColor = async(index) => {
    try {
        const response = await fetch(`/api/user/${userId}`, {
          method: "PATCH",
          body: JSON.stringify({
              ind: index
            })
        });

        if(response.ok){
          console.log("Update successfully");
        }

    } catch (error) {
        console.log("Error occured" , error);
    }
  };

  return (
    <nav className={`flex-between w-full py-5 pl-20 pr-16`} style={{ backgroundColor: borderColor }}>
      <Link href="/Home" className='flex flex-center'>
        <Image src = {blackLogo ? "/logo-black.svg" : "/logo-white.png"}
                  width = {200} 
                  height = {200}
                  className="object-contain"
                  alt='logo'/>
      </Link>

      <div className='flex gap-2 flex-center relative'>
        <Link href="/Home" className='z-[3] pt-8'>
              <div className='bg-black size-[67px] rounded-full'>

              </div>
        </Link>
        <Image
          src={session?.user.image ? session?.user.image : "/default-icon.PNG"}
          width={67}
          height={67}
          className='rounded-full border-black border-[5px] cursor-pointer z-[3] mr-5 mt-8'
          alt='profile'
          onClick={() => {
            setDropDown(!toggleDropDown);
          }}
        />
        {toggleDropDown && (
          <div className='dropdown flex-center shadow-xl z-[2]'>
              <div className='flex flex-col pb-2 flex-center gap-2'>
                <h1 className='text-2xl font-bold pt-20 px-4'>Theme</h1>
                <ul className='flex flex-wrap gap-2 flex-center'>
                  {colorArr.map((value, index) => (
                    <Halfsquare 
                        key={index} 
                        left_color={value[0]} 
                        right_color={value[1]} 
                        setMain={setMain} 
                        setBorder={setBorder} 
                        selection={index} 
                        setBlackLogo={setBlackLogo}
                        setSelected = {setSelected}
                    />
                  ))}
                </ul>
                {colorSelected >= 0 && <button className='blue_btn' onClick={() => {
                  updateColor(colorSelected);
                  setSelected(-1);
                }}>Set Color</button>}
              </div>
              <div className='border-t-[3px] border-[#90A6EB] w-full rounded_corners'>

              </div>

              <div className='flex flex-center flex-col gap-2 mt-2 mb-20'>
                <h1 className='text-2xl font-bold'>Account</h1>
                <div className='profile_info'>
                    {session?.user?.name ? session?.user?.name : "loading..."}
                </div>
                <div className='profile_info'>
                    password
                </div>
                <button className='blue_btn'onClick={() => {signOut()}}>
                    Log Out
                </button>
              </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Nav