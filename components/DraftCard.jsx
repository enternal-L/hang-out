import Image from "next/image";

const DraftCard = ({draft, color, handleDelete, handleClick, setDraft }) => {
    return (
        <>
            <div className={`w-[20%] h-fit my-8 min-w-[250px] relative`} style={{backgroundColor: color}}>
                <div
                    className="object-contain w-full h-44"
                    style={{
                        backgroundImage: 'url(/default-media.PNG)', // Set background image from post data: `url(${post.creator.image})`
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',  
                    }}
                    onClick={() => {handleClick(draft); setDraft(false)}}
                    >
                    <div className="flex flex-row pt-2 px-2">
                        <div className="flex items-center gap-1 w-full">
                            <Image
                            src = "/default-icon.PNG"
                            alt="profile"
                            width = {30} 
                            height = {30}
                            className="object-contain rounded-full border-black"/>
                            <p className="font-semibold text-sm">{draft.username}</p>
                        </div>
                        <div className="flex justify-end w-full items-center">
                            <Image alt="del" src="/trashcan.svg" width={30} height={30} className="cursor-pointer z-[1]" onClick={() => {handleDelete(draft._id)}}></Image>
                        </div>
                    </div>
                </div>
                <div className="">
                    <h1 className="text-4xl items-center p-2 font-semibold">{draft.subject}</h1>
                    <p className="px-3">{draft.description}</p>
                </div>
                <div className="flex flex-row gap-5 flex-center m-3 h-10">
                        <p className="bg-[#FFC95F] rounded-md w-full p-2 flex-center h-full">0 attending</p>
                        <p className="bg-[#FFC95F] rounded-md w-full p-2 flex-center h-full"></p>
                </div>
                <div className="flex flex-row gap-5 flex-center m-3 h-10">
                        <p className="bg-[#FFC95F] rounded-md w-full h-full p-2 flex-center">{draft.location}</p>
                </div>
            </div>
        </>
    )
}

export default DraftCard