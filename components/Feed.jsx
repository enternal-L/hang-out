"use client";

import {useState, useEffect} from "react"
import EventCard from "./EventCard";

const EventCardList = ({ data , handleTagClick }) => {

    return (
      <div className="flex flex-wrap gap-7 size-full justify-center">
          { data.map((post) => (
              <EventCard 
              key = {post._id}
              post = {post}
              handleTagClick = {handleTagClick}
              />
          ))}
      </div>
    );
};

const Feed = () => {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
      const fetchPosts = async () => {
        const response = await fetch('/api/prompt');
        const data = await response.json();

        setPosts(data);
      }

      fetchPosts();
  }, []);

  const handleEdit = () => {
    
  }

  const handleDelete = async() => {

  }

  return (
    <section className="flex size-full">
      <EventCardList
        data={posts}
        handleTag={() => {}}
      />
    </section>
  )
}

export default Feed