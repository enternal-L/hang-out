"use client";

import {useState, useEffect} from "react"
import EventCard from "./EventCard";
import { useRouter } from "next/navigation";

const EventCardList = ({ data , handleTagClick, handleEdit, handleDelete }) => {
    return (
      <div className="flex flex-wrap gap-7 size-full justify-center">
          {data.map((post) => (
              <EventCard 
              key = {post._id}
              post = {post}
              handleTagClick = {handleTagClick}
              handleEdit={() => {handleEdit(post)}}
              handleDelete={() => {handleDelete(post)}}
              />
          ))}
      </div>
    );
};

const Feed = () => {

  const router = useRouter();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
      const fetchPosts = async () => {
        const response = await fetch('/api/prompt');
        const data = await response.json();

        setPosts(data);
      }

      fetchPosts();
  }, []);

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