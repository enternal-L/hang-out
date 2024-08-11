"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from "next/image";
import { useSession } from 'next-auth/react';
import { signOut } from "next-auth/react";
import Halfsquare from './Halfsquare';
import Dropdown from './Dropdown';

const Nav = ({setMain, mainColor, setBorder, borderColor}) => {

  const { data: session } = useSession();
  const userId = session?.user.id;
  const [ toggleDropDown, setDropDown ] = useState(false);
  const [ blackLogo, setBlackLogo ] = useState(true);
  const [ colorSelected, setSelected ] = useState(-1);
  const [ toggleButton, setButton ] = useState(false);
  const [ invites, setInvites ] = useState([]);
  const [ notifBar, setNotif ] = useState(false);
  const [ menuBar, setMenu ] = useState(false);
  const [ selected, isSelected ] = useState(false);

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
        setBlackLogo(data.colorIndex < 4 ? false : true);
      }
    }

    if(userId){
      getColor();
      getInvites(userId);
    }
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
          console.log("Updated successfully");
        }

    } catch (error) {
        console.log("Error occured" , error);
    }
  };

  const getInvites = async(id) => {
      try{
          const response = await fetch(`/api/user/${id}`, {
            method: "GET"
          })

          const data = await response.json();

          if(data){
            setInvites(data.invites);
          }
      }catch(error){
        console.log(error, "error");
      }
  }

  const handleTabs = (main, setMain, sub, setSub) => {
      if(main){
        setDropDown(false);
        setMain(false);
        setSub(false);
        setButton(false);
      }

      else if(sub){
        setMain(true);
        setSub(false);
      }

      else{
        setDropDown(true);
        setMain(true);
      }
  }

  const handleResponse = async(user, answer, eventId) => {
    try{
      const response = await fetch(`/api/prompt/attend/${eventId}`, {
        method: "PATCH",
        body: JSON.stringify({ user, answer })
      });

      if(response.ok){
        alert("Updated succesfully")
      }

    }catch(error){
      console.log(error, "Error");
    }
  }

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
              <div className='border-black border-[5px] size-[67px] rounded-full' 
                style = {{backgroundColor : notifBar ? 'black' : 'white'}}
                onClick={() => {
                    handleTabs(notifBar, setNotif, menuBar, setMenu);}}>
              </div>
        </Link>
        <Image
          src={session?.user.image ? session?.user.image : "/default-icon.PNG"}
          width={67}
          height={67}
          className='rounded-full border-black border-[5px] cursor-pointer z-[3] mr-5 mt-8'
          alt='profile'
          style = {{borderColor : !menuBar ? 'black' : "#90A6EB"}}
          onClick={() => {
              handleTabs(menuBar, setMenu, notifBar, setNotif);
          }}
        />
        {toggleDropDown && (
            <div className='dropdown flex-center shadow-xl z-[2]'>
                  <div className='flex flex-col pb-2 flex-center gap-2'>
                    <h1 className='text-2xl font-bold pt-20 px-4'>{notifBar ? "Notifications" : "Themes"}</h1>
                    {menuBar ? ( 
                          <>
                          <ul className='flex flex-wrap gap-2 flex-center'>
                              {colorArr.map((value, index) => (
                                <Halfsquare 
                                    key={index} 
                                    left_color={value[0]} 
                                    right_color={value[1]} 
                                    selection={index} 
                                    setSelected = {setSelected}
                                    setButton={setButton}
                                />
                              ))}
                          </ul>
                          {toggleButton && <button className='blue_btn' onClick={() => {
                            
                            setMain(colorArr[colorSelected][1]);
                            setBorder(colorArr[colorSelected][0]);
                            setBlackLogo(colorSelected < 4 ? false : true);
                            
                            updateColor(colorSelected);
                            
                            setSelected(-1);
                            setButton(false);

                          }}>Set Color</button>}
                        </>
                    ) :   
                        <div className='flex flex-center h-fit w-full'>
                          <div className='flex-col'>
                              {invites.length > 0 && invites.map((item, index) => (
                                <div className='border-b-4 border-[#90A6EB] flex flex-col gap-2 pb-4' key = {index}>
                                    <div className='flex flex-col'>
                                      <h1 className='text-base font-semibold'>username</h1>
                                      <p>Invited you to join {item.subject}</p>
                                      <p>{item.description}...</p>
                                    </div>
                                    <div className='flex flex-col gap-2 mb-1'>
                                        <div className='flex flex-row gap-2 h-8 flex-center text-center'>
                                          <p className='text-white text-lg rounded-lg bg-[#FFB800] w-full p-1'>{item.date.split('T')[0]}</p>
                                          <p className='text-white text-lg rounded-lg bg-[#FFB800] w-full p-1' >{item.start_time}-{item.end_time}</p>
                                        </div>
                                        <div className='text-white text-lg rounded-lg bg-[#FFB800] w-full flex-center h-8'>
                                            <p>@ {item.location}</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-row flex-center'>
                                      <button className='green_btn w-full' onClick={() => {handleResponse(userId, "yes", item._id)}}>yes</button>
                                      <button className='yellow_btn w-full' onClick={() => {handleResponse(userId, "maybe", item._id)}}>maybe</button>
                                      <button className='red_btn w-full' onClick={() => {handleResponse(userId, "no", item._id)}}>no</button>
                                    </div>
                                </div>
                              ))}
                              {invites.length == 0 && 
                                <div>
                                  <h1>No new Notifications</h1>
                                </div>
                              }
                          </div>
                        </div>
                    }
                  </div>
                  {menuBar && (
                    <>
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
                        <button className='blue_btn w-32'onClick={() => {signOut()}}>
                            Log Out
                        </button>
                      </div>
                    </>
                  )}
              </div>)}
      </div>
    </nav>
  )
}

export default Nav