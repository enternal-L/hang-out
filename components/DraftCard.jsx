import Image from "next/image";

const DraftCard = ({ post, color }) => {
    return (
        <>
            <div className={`bg-[${color}] w-[30%] h-fit my-8 min-w-[250px] relative`}>
                <div
                    className="object-contain w-full h-44"
                    style={{
                        backgroundImage: `/default-media.PNG`, // Set background image from post data: `url(${post.creator.image})`
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                >
                    <div className="flex flex-row pt-2 px-2">
                        <div className="flex items-center gap-1 w-full">
                            <Image
                            src = "/default-icon.PNG"
                            alt="profile"
                            width = {30} 
                            height = {30}
                            className="object-contain rounded-full border-black"/>
                            <p className="font-semibold text-sm">username</p>
                        </div>
                    </div>
                </div>
                <div className="">
                    <h1 className="text-4xl items-center p-2 font-semibold">{post.subject}</h1>
                    <p className="px-3">{post.description}</p>
                </div>
                <div className="flex flex-row gap-5 flex-center m-3">
                        <p className="bg-[#FFC95F] rounded-md w-full p-2 flex-center">0 attending</p>
                        <p className="bg-[#FFC95F] rounded-md w-full p-2 flex-center"></p>
                </div>
                <div className="flex flex-row gap-5 flex-center m-3">
                        <p className="bg-[#FFC95F] rounded-md w-full p-2 flex-center">{post.location}</p>
                </div>
            </div>
        </>
    )
}

export default DraftCard