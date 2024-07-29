import Image from "next/image";
import Link from "next/link";
const eventCard = () => {

    const peopleCount = 0;

    return (
        <Link className="prompt_card" href="">
            <div className="flex justify-between items-start gap-5">
                <div className = "flex-1 flex justify-start items-center gap-3 cursor-pointer">
                        <Image src = {post.creator.medua}
                            alt = "user_image"
                            width = {100} 
                            height = {100}
                            className="object-contain"/>

                    <h1>{post.creator.subject}</h1>
                    <p>{post.creator.description}</p>
                    <div className="flex flex-row gap-5">
                        <p className="rounded_corners border-solid">{peopleCount} attending</p>
                        <p className="rounded_corners border-solid">Date:</p>
                    </div>
                </div>
            </div>

        </Link>
    )
}

export default eventCard