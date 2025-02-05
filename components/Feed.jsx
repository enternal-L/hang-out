"use client";

import {useState, useEffect} from "react"
import EventCard from "./EventCard";
import { useRouter } from "next/navigation";
import { useSession } from 'next-auth/react';
import Image from "next/image";
import getCurrentDateStatus from "@utils/dateDetection"

const EventCardList = ({ data , handleTagClick, handleEdit, handleDelete, handleSort, mainColor }) => {
    const [toggleStates, setToggles] = useState([]);
    const [shareEvent, setShare] = useState([]);
    const [filteredData, setFilter] = useState([]);
    const [dropDown, setDropDown] = useState(false);
    const [option, setOption] = useState("");
    const [sortDropdown, setSortDrop] = useState(false);

    //event status to color hashmap
    const colorMap = new Map([["pending", "#FFB800"], ["active", "#00FF29"], ["expired", "#FF3939"]]);

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
        <div className="w-full h-10 flex flex-row mt-4 px-4 relative gap-2">
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
          <div className="flex flex-center cursor-pointer relative">
                <Image
                  width={33}
                  height={33}
                  src="/sort.svg"
                  alt="sort-menu"
                  onClick={() => {setSortDrop(!sortDropdown)}}
                />
          </div>
          {sortDropdown && 
                <div className="flex w-36 h-32 flex-col flex-center bg-white px-5 py-2 rounded-lg relative z-[2] gap-2">
                  <p className="text-lg cursor-pointer" onClick={() => (handleSort("latest"))}>Latest</p>
                  <p className="text-lg cursor-pointer" onClick={() => (handleSort("earliest"))}>Earliest</p>
                  <p className="text-lg cursor-pointer" onClick={() => (handleSort("archive"))}>Archived</p>
                </div>}
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
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                  handleDropdown={() => {toggleDropDown(index)}}
                  dropDown = {toggleStates[index]}
                  share = {shareEvent[index]}
                  handleShare={() => {toggleShare(index)}}
                  colorMap = {colorMap}
                  mainColor = {mainColor}
                />
            ))}
        </div>
      </div>
    );
};

const Feed = ({mainColor}) => {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFiltered] = useState([]);
  const { data: session } = useSession();

  const now = new Date();

  const [earliest, setEarliest] = useState(false);
  const [latest, setLatest] = useState(false);
  const [archive, setArchive] = useState(false);

  const fetchPosts = async() => {
    const response = await fetch('/api/prompt');
    const data = await response.json();

    const filteredData = data.filter((p) => 
      p.creator._id === session?.user?.id
    );
    // && p.status !== "expired"

    filteredData.forEach(element => {
        //init date
        const start_date = timeTranslation(element.date);
        const end_date = timeTranslation(element.date);

        //init times
        const start_time = element.start_time.split(":");
        const end_time = element.end_time.split(":");

        start_date.setHours(parseInt(start_time[0]));
        start_date.setMinutes(parseInt(start_time[1]));

        end_date.setHours(parseInt(end_time[0]));
        end_date.setMinutes(parseInt(end_time[1]));

        const res = getCurrentDateStatus(start_date, end_date);

        if(res > 0){
          element.status = res == 1 ? "active" : "expired";
        }

        editStatus(element);
    })//for every load of an event, update its status 
    setPosts(filteredData);

    const defData = filteredData.filter((p) => 
      p.status !== "expired"
    )

    setFiltered(defData.sort((a, b) => (defaultDate(a.date, a.start_time) - now) - (defaultDate(b.date, b.start_time) - now)));
  }

  useEffect(() => {
    if(session?.user?.id){
      fetchPosts();
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

  const sortBy = (mode) => {
    if(mode == "earliest"){
      setFiltered([...filteredPosts].sort((a, b) => timeTranslation(a.createdAt) - timeTranslation(b.createdAt)));
      
      setEarliest(!earliest);
      setLatest(false);
      setArchive(false);
    }// if earliest is selected, sort by earliest creation time

    else if(mode == "latest"){
      setFiltered([...filteredPosts].sort((a, b) => timeTranslation(b.createdAt) - timeTranslation(a.createdAt)));

      setLatest(!latest);
      setArchive(false);
      setEarliest(false);
    }// if latest is selected, sort by latest creation time

    else if(mode == "archive"){
      setFiltered(posts.filter((p) => 
        p.status == "expired"
      ));

      setArchive(!archive);
      setLatest(false);
      setEarliest(false);
    }// if archived is selected, filter by expired events

    if(!archive && !latest && !earliest){
      const unexpired = posts.filter((item) => item.status != "expired");
      setFiltered(unexpired.sort((a, b) => (defaultDate(a.date, a.start_time) - now) - (defaultDate(b.date, b.start_time) - now)));
      //time from current time calculator
    }// if none is chosen, sort by time between now and start time
  }

  const defaultDate = (date, time) => {
    const dateArr = date.split("T")[0];
    const curDate = dateArr.split("-");
    const timeArr = time.split(":");

    return new Date(curDate[0], curDate[1], curDate[2], timeArr[0], timeArr[1], 0, 0);
  }

  const timeTranslation = (input) => {
    //2024-08-17T09:24:23.362Z
    const temp = input.split("T");
    const date = temp[0].split("-");

    const year = date[0];
    const month = date[1];
    const day = date[2];

    const time = temp[1].split(":");

    const hour = time[0];
    const minute = time[1];
    const seconds = time[2].split(".");

    const second = seconds[0];
    const millisecond = seconds[1].slice(0, -1); //slice the z off

    return new Date(year, month, day, hour, minute, second, millisecond);
  }

  const editStatus = async(post) => {

    try{
        const response = await fetch(`/api/prompt/${post._id}`, {
            method: "PATCH",
            body: JSON.stringify({
                subject: post.subject,
                description: post.description,
                location: post.location,
                date: post.date,
                start_time: post.start_time,
                end_time: post.end_time,
                color: post.color,
                status : post.status
              })});

        if (response.ok) console.log("Status Updated Successfully");

    }catch(error){
      console.log("Error: ", error)
    }
  }

  return (
    <section className="flex size-full">
      <EventCardList
        data={filteredPosts}
        handleTagClick={handleTagClick}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleSort = {sortBy}
        mainColor = {mainColor}
      />
    </section>
  )
}

export default Feed


// for the color we could do a dictionary where numbers map to different hexcodes