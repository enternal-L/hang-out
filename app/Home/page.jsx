import Feed from "@components/Feed";
import Nav from "@components/Nav";

const App = () => {
  return (
    <section className="w-full flex-center flex-col">
      <Nav />
      <h1>A place to plan your events</h1>
      <Feed />
    </section>
  )
}

export default App