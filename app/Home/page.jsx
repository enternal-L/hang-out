import Feed from "@components/Feed";
import Return from "@components/Return";
import Nav from "@components/Nav";

const Home = () => {
  return (
    <>
      <Nav />
      <div className="w-full h-full flex-col flex-center px-11">
        <div className="custom_color w-full h-full flex-col rounded_corners flex-center">
          <h1>A place to plan your events</h1>
          <Feed />
        </div>
        <Return/>
      </div>
    </>
  )
}

export default Home