import Link from "next/link";

//form
const Form = ({ type, post, setPost, submitting, handleSubmit, mainColor, borderColor }) => {
    return (
      <section className='w-full h-full max-w-full flex-start flex-row pb-7' style={{backgroundColor : borderColor}}>
        <form onSubmit={handleSubmit} className="w-full h-full flex">
        <div className="w-full h-full flex-row rounded_corners flex-center mx-11 p-4 gap-7" style={{backgroundColor : mainColor}}>
          <div className="w-[55%] h-full bg-[#F1E5CB] rounded_corners flex-center flex-col gap-4 p-8">
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
          <div className="bg-white w-[45%] h-full rounded_corners flex flex-col gap-6 p-8 pt-16">
              <div className="flex flex-row w-full h-44 flex-center px-4 gap-2">
                  <Link className="blue_btn h-20 w-52 cursor-pointer" href="/Home">
                    Cancel
                  </Link>
                  <button
                    type='submit'
                    disabled={submitting}
                    className='w-full h-full custom_color text-white text-4xl text-bold rounded-xl'
                  >
                    {type}
                  </button>
              </div>
              <div className="flex flex-row w-full h-20 flex-wrap gap-3 flex-center">
                  <input className="w-full bbb h-20 px-4 text-2xl"
                    placeholder="add google map location"
                    value={post.location}
                    onChange={(e) => setPost({...post, location: e.target.value})}
                  ></input>
              </div>

              <div className="flex flex-row w-full h-40 gap-3 flex-center">
                    <input className="w-full bbb flex-center h-20"
                      placeholder="select date"
                      type="date"
                      value={post.date}
                      onChange={(e) => setPost({...post, date: e.target.value})}
                    >
                    </input>
                    <input className="w-full bbb flex-center h-20"
                      placeholder="select time"
                      type="time"
                      value={post.time}
                      onChange={(e) => setPost({...post, time: e.target.value})}
                    >
                    </input>
              </div>

              <div className="flex flex-col w-full h-full gap-3">
                  <h1 className="text-4xl font-semibold">Event Color</h1>
                  <ul className='flex flex-row gap-2 flex-start w-full h-full'>
                    <li className="w-16 h-16 rounded-full bg-[#FFFFFF] border-black border-[3px] cursor-pointer" onClick={() => setPost({...post, color: "#FFFFFF"})}></li>
                    <li className="w-16 h-16 rounded-full bg-[#F1E5CB] border-black border-[3px] cursor-pointer" onClick={() => setPost({...post, color: "#F1E5CB"})}></li>
                    <li className="w-16 h-16 rounded-full bg-[#EEF9FF] border-black border-[3px] cursor-pointer" onClick={() => setPost({...post, color: "#EEF9FF"})}></li>
                    <li className="w-16 h-16 rounded-full bg-[#222831] border-black border-[3px] cursor-pointer" onClick={() => setPost({...post, color: "#222831"})}></li>
                  </ul>
              </div>
          </div>
        </div>
        </form>
      </section>
    )
  }

export default Form