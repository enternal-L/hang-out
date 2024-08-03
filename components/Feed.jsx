"use client";

import {useState, useEffect} from "react"
import EventCard from "./EventCard";
import { useRouter } from "next/navigation";

const EventCardList = ({ data , handleTagClick, handleEdit }) => {
    return (
      <div className="flex flex-wrap gap-7 size-full justify-center">
          {data.map((post) => (
              <EventCard 
              key = {post._id}
              post = {post}
              handleTagClick = {handleTagClick}
              handleEdit={() => {handleEdit(post)}}
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

  const handleDelete = async() => {

  }

  return (
    <section className="flex size-full">
      <EventCardList
        data={posts}
        handleTag={() => {}}
        handleEdit={handleEdit}
      />
    </section>
  )
}

export default Feed