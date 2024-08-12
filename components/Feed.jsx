"use client";

import {useState, useEffect} from "react"
import EventCard from "./EventCard";
import { useRouter } from "next/navigation";
import { useSession } from 'next-auth/react';
import Image from "next/image";
import Dropdown from "./Dropdown";

const EventCardList = ({ data , handleTagClick, handleEdit, handleDelete }) => {

    const [toggleStates, setToggles] = useState([]);
    const [shareEvent, setShare] = useState([]);
    const [filteredData, setFilter] = useState([]);
    const [dropDown, setDropDown] = useState(false);

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

    const handleSearch = (e) => {

      const regex = new RegExp(e.target.value, 'i');

      if(e.target.value == ""){
        setFilter(data);
        return;
      }

      const searchRes = [...data].filter(item => regex.test(item.subject));

      setFilter(searchRes);
    }

    return (
      <div className="flex flex-col size-full">
        <div className="w-full h-10 flex flex-row mt-4 px-4">
          <input placeholder="Search an event..." className="border border-black w-[20%] h-10 p-4 rounded-lg outline-none bg-white" 
            onChange={(e) => {handleSearch(e)}}
            onClick={() => {setDropDown(!dropDown)}}
            ></input>
          {dropDown && 
              <div className="">
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
                  handleTagClick = {handleTagClick}
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

  useEffect(() => {
    if(session?.user?.id){
      const fetchPosts = async() => {
        const response = await fetch('/api/prompt');
        const data = await response.json();

        const filteredData = data.filter((p) => 
          p.creator._id === session?.user?.id
        );

        setPosts(filteredData);
      }

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

  const handleTagClick = () => {

  }

  return (
    <section className="flex size-full">
      <EventCardList
        data={posts}
        handleTag={() => {}}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </section>
  )
}

export default Feed