import Feed from "@components/Feed";
import Nav from "@components/Nav";
import Link from "next/link";

const Home = () => {
  return (
    <>
      <Nav />
      <div className="w-full h-full flex-col flex-center px-11">
        <div className="custom_color w-full h-full flex-col rounded_corners flex-center">
          <Feed />
          <Link href = "/Home/Create" className="flex flex-center w-[65px] h-[65px] right-16 bottom-4 fixed rounded-full border-2 bg-white text-6xl font-bold">+</Link>
        </div>
      </div>
    </>
  )
}

export default Home