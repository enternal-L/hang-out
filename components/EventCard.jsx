import Image from "next/image";
import Share from "./Share";

const EventCard = ({ index, post, color, handleTagClick, handleEdit, handleDelete, handleDropdown, dropDown, share, handleShare , colorMap, mainColor}) => {


    const peopleCount = post.attendees.filter(element => element.answer == "yes").length;

    return (
        <>
            {share && <Share event = {post} setShare={handleShare}/>}
            <div className={`w-[20%] h-fit my-8 min-w-[250px] relative pb-4`} onClick={() => {handleTagClick(post)}} style={{backgroundColor : color}}> {/* onClick={() => {handleTagClick(post)}} */}
                {dropDown && (
                    <div className='flex flex-end shadow-xl absolute bg-white right-0'>
                        <div className='h-64 flex flex-col px-4 flex-center gap-2 pt-7'>
                            <Image src = "/share.svg" alt="share" width = {33} height = {33}
                            className="object-contain cursor-pointer" onClick={(e) => {e.stopPropagation(); handleShare()}}/>
                            <Image src = "/pen-square.svg" alt="edit" width = {40} height = {40}
                            className="object-contain cursor-pointer" onClick={(e) => {e.stopPropagation(); handleEdit(post)}}/>
                            <p>Archive</p>
                            <p>Star</p>
                            <Image src = "/trashcan.svg" alt="delete" width = {40} height = {40} 
                            className="object-contain cursor-pointer" onClick={(e) => {e.stopPropagation(); handleDelete(post)}}/>
                        </div>
                    </div>
                )}
                <div
                    className="object-contain w-full h-44"
                    style={{
                        backgroundImage: `url(${post.creator.image})`, // Set background image from post data
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                >
                    <div className="flex flex-row pt-2 px-2">
                        <div className="flex items-center gap-1 w-full">
                            <Image
                            src = {post.creator.image}
                            alt="profile"
                            width = {30} 
                            height = {30}
                            className="object-contain rounded-full border-black"/>
                            <p className="font-semibold text-sm">{post.creator.username}</p>
                        </div>
                        <div className="flex justify-end w-full items-center">
                            <Image alt="dropdown" src="/menu.svg" width={20} height={20} onClick={(e) => {e.stopPropagation(); handleDropdown()}} className="cursor-pointer z-[0]"></Image>
                        </div>
                    </div>
                </div>
                <div className="">
                    <h1 className="text-4xl items-center p-2 font-semibold">{post.subject}</h1>
                    <p className="px-3">{post.description}</p>
                </div>
                <div className="flex flex-row gap-3 flex-start m-3">
                        <p className="bg-[#FFC95F] rounded-md w-[40%] p-2 flex-center">{post.start_time}-{post.end_time}</p>
                        <p className="bg-[#FFC95F] rounded-md w-[35%] p-2 flex-center">{post.date.split('T')[0]}</p>
                </div>
                <div className="flex flex-row gap-5 flex-start m-3">
                        <p className="bg-[#FFC95F] rounded-md w-fit min-w-72 p-2 flex-center">{post.location}</p>
                </div>
                <div className="flex flex-row gap-5 flex-start m-3">
                        <p className="bg-[#FFC95F] rounded-md min-w-36 p-2 flex-center">{peopleCount} attending</p>
                </div>
                <div className="flex flex-center flex-col absolute right-0 bottom-0 rounded-full w-10 h-10 translate-x-3 translate-y-3 p-2" style={{backgroundColor: mainColor}}>
                    <div className="rounded-full w-full h-full" style={{backgroundColor: colorMap.get(post.status)}}>
                    </div>
                </div>

                {/* 
                    "pending" : #FFB800
                    "active" : #00FF29
                    "expired" : #FF3939
                */}
            </div>
        </>
    )
}

export default EventCard