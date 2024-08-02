import Feed from "@components/Feed";
import Nav from "@components/Nav";

const Home = () => {
  return (
    <>
      <Nav />
      <div className="w-full h-full flex-col flex-center px-11">
        <div className="custom_color w-full h-full flex-col rounded_corners flex-center">
          <Feed />
          <div className="flex-end">
              <div className="right-0 bottom-0 rounded-full bg-white">
                  <span>+</span>
              </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home