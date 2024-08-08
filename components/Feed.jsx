"use client";

import {useState, useEffect} from "react"
import EventCard from "./EventCard";
import { useRouter } from "next/navigation";
import { useSession } from 'next-auth/react';

const EventCardList = ({ data , handleTagClick, handleEdit, handleDelete }) => {

    const [toggleStates, setToggles] = useState([]);
    const [shareEvent, setShare] = useState([]);

    useEffect(() => {
        setToggles(Array(data.length).fill(false));
        setShare(Array(data.length).fill(false));
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

    return (
      <div className="flex flex-wrap gap-7 size-full justify-center">
          {toggleStates.length > 0 && data.map((post, index) => (
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