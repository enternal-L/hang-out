"use client";

import {useState, useEffect} from "react"
import EventCard from "./EventCard";
import { useRouter } from "next/navigation";
import { useSession } from 'next-auth/react';
import Image from "next/image";

const EventCardList = ({ data , handleTagClick, handleEdit, handleDelete }) => {
    const [toggleStates, setToggles] = useState([]);
    const [shareEvent, setShare] = useState([]);
    const [filteredData, setFilter] = useState([]);
    const [dropDown, setDropDown] = useState(false);
    const [option, setOption] = useState("");

    useEffect(() => {
        setToggles(Array(data.length).fill(false));
        setShare(Array(data.length).fill(false));
        setFilter(data);
    }, [data]);

    const toggleDropDown = (id) => {
      if(!toggleStates){
        return;
      }

      const copied = [...toggleStates];
      copied[id] = !copied[id];

      setToggles(copied);
    }

    const toggleShare = (id) => {
      if(!shareEvent){
        return;
      }

      const copied = [...shareEvent];
      copied[id] = !copied[id];

      setShare(copied); 
    }

    const handleSearch = (e, mode) => {

      const regex = new RegExp(e.target.value, 'i');

      if(e.target.value == ""){
        setFilter(data);
        return;
      }

      const searchRes = [...data].filter(item => {
        if(mode == "has"){
          return regex.test(item.description);
        }

        else if(mode == "by"){
          return regex.test(item.creator.username);
        }

        else if(mode == "at"){
          return regex.test(item.location);
        }
        
        else if(mode == "during"){
          return item.date.split('T')[0] == e.target.value
        }

        //parseInt(value, 10)

        else if(mode == "before"){
          return parseInt(item.date.split('T')[0].split('-').join(""), 10) < parseInt(e.target.value.split('-').join(""), 10);
        }

        else if(mode == "after"){
          return parseInt(item.date.split('T')[0].split('-').join(""), 10) > parseInt(e.target.value.split('-').join(""), 10);
        }

        else{
          return regex.test(item.subject);
        }
      });

      setFilter(searchRes);
    }

    return (
      <div className="flex flex-col size-full">
        <div className="w-full h-10 flex flex-row mt-4 px-4 relative">
          <div className="flex flex-center flex-row border border-black w-80 min-w-36 h-10 p-2 rounded-lg outline-none bg-white gap-1">
            {option && 
              <div className="rounded-sm custom_color text-white px-1">
                  <p>{option}:</p>
              </div>
            }
            <input placeholder= {option ? "" : `Search an event...`} className="w-full outline-none" 
              type = {option == "before" || option == "during" || option == "after" ? "date" : "text"}
              onChange={(e) => {handleSearch(e , option ? option : "title")}}
              onClick={() => {setDropDown(true)}}
              ></input>
          </div>
          {dropDown && 
              <div className="flex w-80 min-w-36 absolute flex-col bg-white top-12 px-5 pt-2 pb-4 rounded-sm z-[2]">
                <div className="flex flex-row flex-center">
                  <h1 className="text-sm font-bold w-full">Search Options</h1>
                  <Image
                    src="/cross.svg"
                    width={10}
                    height={10}
                    alt="cross"
                    className="cursor-pointer"
                    onClick={() => {setDropDown(false); setOption(false)}}
                  ></Image>
                </div>
                <div className="flex flex-col gap-1 mt-2 items-start">
                    <button className="" onClick={() => setOption("has")}>has: text</button>
                    <button onClick={() => setOption("by")}>by: user</button>
                    <button onClick={() => setOption("at")}>at: location</button>
                    <button onClick={() => setOption("before")}>before: specific date</button>
                    <button onClick={() => setOption("during")}>during: specific date</button>
                    <button onClick={() => setOption("after")}>after: specific date</button>
                </div> 
              </div>
          }
        </div>
        <div className="flex flex-wrap gap-7 size-full justify-center">
            {toggleStates.length > 0 && filteredData.map((post, index) => (
                <EventCard 
                  index = {index}
                  key = {post._id}
                  post = {post}
                  color={post.color}
                  handleTagClick = {() => {handleTagClick(post)}}
                  handleEdit={() => {handleEdit(post)}}
                  handleDelete={() => {handleDelete(post)}}
                  handleDropdown={() => {toggleDropDown(index)}}
                  dropDown = {toggleStates[index]}
                  share = {shareEvent[index]}
                  handleShare={() => {toggleShare(index)}}
                />
            ))}
        </div>
      </div>
    );
};

const Feed = () => {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const { data: session } = useSession();

  const fetchPosts = async() => {
    const response = await fetch('/api/prompt');
    const data = await response.json();

    const filteredData = data.filter((p) => 
      p.creator._id === session?.user?.id
    );

    setPosts(filteredData);
  }

  useEffect(() => {
    if(session?.user?.id){
      fetchPosts(session.user.id);
    }
  }, [session]);

  const handleEdit = (post) => {
      router.push(`/Home/Edit?id=${post._id}`)
  }

  const handleDelete = async(post) => {
      const isConfirmed = confirm("Are you sure to delete this event?");
      
      if(isConfirmed){
        try{
            await fetch(`/api/prompt/${post._id.toString
            ()}`, {
              method: "DELETE"
            });

            const filteredEvents = posts.filter((p) => 
              p._id !== post._id
            );

            setPosts(filteredEvents);
        } catch(error){
            console.log("Error Occured", error);
        }
      }
  }

  const handleTagClick = (post) => {
      router.push(`/Home/${post._id}`)
  }

  return (
    <section className="flex size-full">
      <EventCardList
        data={posts}
        handleTagClick={handleTagClick}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </section>
  )
}

export default Feed