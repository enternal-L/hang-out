//form
const Form = ({ post, setPost, submitting, handleSubmit}) => {
    return (
      <section className='w-full max-w-full flex-start flex-col'>
          <form onSubmit={handleSubmit} className='mt-10 w-full max-w-2x1 flex flex-col gap-7 glassmorphism'>
            <label>
              <textarea 
                value={post.prompt}

                /////

                onChange={(e) => setPost({...post, prompt: e.target.value})}
                placeholder='Subject'
                required
                className='form_textarea'
              />
            </label>
          </form>
      </section>
    )
  }

export default Form