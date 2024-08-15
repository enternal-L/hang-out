import Link from "next/link";
import Image from "next/image";
import DraftCard from "./draftCard";

//form
const Form = ({ type, post, setPost, submitting, handleSubmit, mainColor, borderColor, drafts, toggleDraft, setDraft, createDraft, delDraft, Cancel, setCancel}) => {
    return (
      <section className='w-full h-full max-w-full flex-start flex-row pb-7' style={{backgroundColor : borderColor}}>
        <form onSubmit={Cancel ? createDraft : handleSubmit} className="w-full h-full flex">
        <div className="w-full h-full flex-row rounded_corners flex-center mx-11 p-5 gap-7 relative" style={{backgroundColor : mainColor}}>
          {toggleDraft && <div className="absolute top-0 right-0 size-full rounded-3xl z-[3] flex flex-col" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <div className="flex flex-end px-5 pt-2">
                  <h1 onClick={() => {setDraft(false)}} className="text-white text-3xl cursor-pointer">x</h1>
                </div>
                <div className="flex flex-wrap justify-center items-start w-full h-full">
                      {drafts.map((item, index) => (
                        <DraftCard key={index} post={item} color={item.color} handleDelete={delDraft}/>
                      ))}
                </div>
          </div>}

          {Cancel && <div className="absolute top-0 right-0 size-full rounded-3xl z-[3]" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <div className="flex flex-wrap flex-center w-full h-full flex-col gap-2">
                      <button type = "submit" onClick={() => {createDraft}} className="text-white cursor-pointer">Save as Draft</button>
                      <Link className="text-white cursor-pointer" href="/Home">Discard</Link>
                </div>
          </div>}
          <div className="w-[60%] h-full bg-[#F1E5CB] rounded_corners flex-center flex-col gap-4 p-8">
            <textarea 
                value={post.subject}
                onChange={(e) => setPost({...post, subject: e.target.value})}
                placeholder='title'
                required
                className='h-20 p-3 form_field font-semibold text-2xl flex-center'
            />
            <input 
                value={post.media}
                onChange={(e) => setPost({...post, media: e.target.value})}
                type = "file"
                placeholder="add media"
                className='form_field rounded_corners h-60 p-4 opacity-0;'
                accept="image/*"
            />
            <textarea 
                value={post.description}
                onChange={(e) => setPost({...post, description: e.target.value})}
                placeholder='description'
                className='form_field p-3 h-64 text-lg'
            />
          </div>
          <div className="w-[40%] h-full rounded_corners flex flex-col gap-5 p-4 pt-6">
              <div className="flex flex-row w-full h-20 flex-center px-10 gap-2">
                  <div className="flex flex-row w-full gap-2">
                    <div className="relative w-70 h-70">
                      <Image src = "/default-icon.PNG"
                          width = {65} 
                          height = {65}
                          className="object-contain bg-white border-4 border-black rounded-full"
                        alt='logo'/>
                      <p className="absolute top-0 right-0 text-3xl font-bold text-black plus-sign">+</p>
                    </div>
                    <Image src = "/quill.svg"
                        width = {65} 
                        height = {65}
                        className="object-contain bg-white border-4 border-black rounded-full cursor-pointer"
                        onClick={() => {setDraft(true)}}
                        alt='draft'
                    />
                  </div>
                  <div className="flex flex-row w-full gap-2 h-16">
                    <Link className="outline_btn h-full text-3xl font-bold cursor-pointer" href="" onClick={() => setCancel(true)}>
                      Cancel
                    </Link>
                    <button
                      type='submit'
                      disabled={submitting}
                      className='w-full h-full outline_btn text-white text-3xl font-bold rounded-xl'
                    >
                      {type}
                    </button>
                  </div>
              </div>
              <div className="bg-white border-4 border-black rounded_corners flex flex-center flex-col p-6 gap-1">
                <div className="flex flex-row w-full h-20 flex-wrap gap-3 flex-center">
                    <input className="w-full border-4 border-black h-16 px-4 text-xl rounded-xl"
                      placeholder="add google map location"
                      value={post.location}
                      onChange={(e) => setPost({...post, location: e.target.value})}
                    ></input>
                </div>

                <div className="flex flex-col w-full h-32 gap-3 p-2 border-4 border-black rounded-xl">
                      <p className="font-bold text-xl text-center">Select date and time</p>
                      <div className="flex gap-2 flex-row h-full pb-2">
                        <input className="w-full bbb"
                          placeholder="select date"
                          type="date"
                          value={post.date}
                          onChange={(e) => setPost({...post, date: e.target.value})}
                        >
                        </input>
                        <div className="flex flex-row w-full justify-center gap-1">
                          <input className="w-36 bbb h-full"
                            placeholder="select time"
                            type="time"
                            value={post.start_time}
                            onChange={(e) => setPost({...post, start_time: e.target.value})}
                          >
                          </input>
                          <div className="flex flex-center h-full">
                            <p className="font-semibold text-3xl">-</p>
                          </div>
                          <input className="w-36 bbb h-full"
                            placeholder="select time"
                            type="time"
                            value={post.end_time}
                            onChange={(e) => setPost({...post, end_time: e.target.value})}
                          >
                          </input>
                        </div>
                      </div>
                </div>
              </div>

              <div className="flex flex-col w-full h-56 p-4 px-5 rounded_corners border-4 border-black bg-white flex-center">
                  <h1 className="text-xl font-bold">Event Color</h1>
                  <ul className='flex flex-row gap-2 w-full h-full justify-between items-center p-2'>
                    <Image
                      width={130}
                      height={130}
                      alt="mock-white"
                      src="/white-mock.svg"
                      className="cursor-pointer"
                      onClick={() => setPost({...post, color: "#FFFFFF"})}
                    ></Image>
                    <Image
                      width={130}
                      height={130}
                      alt="mock-yellow"
                      src="/yellow-mock.svg"
                      className="cursor-pointer"
                      onClick={() => setPost({...post, color: "#F1E5CB"})}
                    ></Image>
                    <Image
                      width={130}
                      height={130}
                      alt="mock-blue"
                      src="/blue-mock.svg"
                      className="cursor-pointer"
                      onClick={() => setPost({...post, color: "#134460"})}
                    ></Image>
                    <Image
                      width={130}
                      height={130}
                      alt="mock-black"
                      src="/black-mock.svg"
                      className="cursor-pointer"
                      onClick={() => setPost({...post, color: "#222831"})}
                    ></Image>
                  </ul>
              </div>
          </div>
        </div>
        </form>
      </section>
    )
  }

export default Form