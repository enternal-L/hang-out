import Link from "next/link"

//form
const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
    return (
      <section className='w-full h-full max-w-full flex-start flex-row pb-7'>
        <form onSubmit={handleSubmit} className="w-full h-full flex">
        <div className="custom_color w-full h-full flex-row rounded_corners flex-center mx-11 p-4 gap-7">
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
          <div className="bg-white w-[45%] h-full rounded_corners flex flex-col gap-4 p-8 pt-16">
              <div className="flex flex-row w-full h-44 flex-center px-4 gap-2">
                  <Link className="blue_btn h-20 w-52" href="/Home">
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
                    placeholder="add location"
                  ></input>
              </div>

              <div className="flex flex-row w-full h-40 gap-3 flex-center">
                    <input className="w-full bbb flex-center h-20"
                      placeholder="select date"
                      type="date"
                    >
                    </input>
                    <input className="w-full bbb flex-center h-20"
                      placeholder="select time"
                      type="time"
                    >
                    </input>
              </div>

              <div className="flex flex-row w-full h-full">
                  <h1 className="text-5xl">Event Color</h1>
                  <ul className='flex flex-row gap-2 flex-center'>
                    <li>Color</li>
                    <li>Color</li>
                    <li>Color</li>
                    <li>Color</li>
                  </ul>
              </div>
          </div>
        </div>
        </form>

            {/* <div className="flex-end mx-3 mb-5 gap-4">
                <Link className="text-gray-500 text-sm" href="/Home">
                  cancel
                </Link>
                <button
                  type='submit'
                  disabled={submitting}
                  className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
                >
                  submit
                </button>
            </div>
          </form> */}
      </section>
    )
  }

export default Form

{/* <form onSubmit={handleSubmit} className='mt-10 w-full max-w-2x1 flex flex-col gap-7 glassmorphism'>
      <label>
        <textarea 
          value={post.subject}
          onChange={(e) => setPost({...post, subject: e.target.value})}
          placeholder='Subject'
          required
          className='form_textarea'
        />
      </label>  
      <label>
        <input 
          value={post.media}
          onChange={(e) => setPost({...post, media: e.target.value})}
          type = "file"
          className='form_textarea'
        />
      </label>  
      <label>
        <textarea 
          value={post.description}
          onChange={(e) => setPost({...post, description: e.target.value})}
          placeholder='Description'
          className='form_textarea'
        />
      </label>

      <label>
        <input>
        </input>
      </label> */}