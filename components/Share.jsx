"use client"
import { useEffect, useState } from "react";
import Image from "next/image";


const Share = ({event, setShare}) => {

    const [userArr, setArr] = useState([]);
    const [access, setAccess] = useState([]);
    const [query, setQuery] = useState("");
    const [search, setSearch] = useState(false);

    useEffect(() => {
        fetchUsers();
        fetchAdded();
    }, [query])

    const handleAttending = async(user, answer) => {
        try{
            const response = await fetch(`/api/prompt/attend/${event._id.toString
                ()}`, {
                  method: "PATCH",
                  body: JSON.stringify({ user, answer })
                });

            const text = await response.text();

            if(response.ok){
                alert(text);
                fetchUsers();
                return;
            }

        } catch(error){
            console.log("Error Occured", error);
        }
    }

    const fetchUsers = async() => {
        const response = await fetch(`/api/search`, {
            method: "POST",
            body: JSON.stringify({
                query
            })
        });

        const data = await response.json();

        setArr(data);
    }

    const fetchAdded = async() => {
        const response = await fetch(`/api/prompt/${event._id.toString()}`, {
            method: "GET"
        })

        const data = await response.json();

        setAccess(data.attendees);
    }

    return (
        <>
            <div className="bg-black w-full h-full flex flex-center absolute z-10 top-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <div className="bg-white w-96 h-fit flex flex-col rounded-xl p-5 gap-3">
                    <h1 className="font-semibold text-2xl">Share "{event.subject}"</h1>
                    <div className="w-full relative">
                        <div className="flex flex-row">
                            <input placeholder="Invite People" className="border border-r-0 border-black w-full h-10 p-4 rounded-l-sm outline-none" value = {query} onChange={(e) => {setQuery(e.target.value); setSearch(true);}}></input>
                            <div className="border border-black border-l-0 flex-center p-4 h-10">
                                <Image className="cursor-pointer"
                                    width={13}
                                    height={13}
                                    src = "/cross.svg"
                                    onClick={() => {
                                        setSearch(false);
                                        setQuery("");
                                    }}
                                />
                            </div>
                        </div>
                        {search &&
                            <div className="bg-white w-full absolute h-fit flex flex-col">
                                {userArr.length > 0 && userArr.map((user, index) => (
                                    <div key = {index} className="flex flex-row gap-2 p-2 px-2 cursor-pointer hover:bg-slate-100" onClick={() => {                                  
                                        if(confirm(`Do you want to invite, ${user.username}?`)){
                                            handleAttending(user._id, "pending");
                                            setSearch(false);
                                        }}}>
                                        <p>Image</p>
                                        <p className="text-base">{user.username}</p>
                                    </div>
                                )
                                )}
                            </div>
                        }
                    </div>
                    <h1 className="font-semibold text-lg">People with access</h1>
                    <div className="flex flex-col gap-3">
                        {access.length > 0 && access.map((obj, index) => (
                            <div key = {index} className="flex flex-row gap-2">
                                <p>Image</p>
                                <p className="text-base">{obj.user.username}</p>
                                { obj.answer === "pending" ? <p>pending...</p> : 
                                    <div>
                                        <p>{obj.answer}</p>
                                    </div>
                                }
                            </div>
                        )
                        )}
                    </div>
                    <div className="w-full h-11 flex flex-row justify-between">
                        <button className="blue_btn">Copy link</button>
                        <button className="blue_btn" onClick={setShare}>Done</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Share