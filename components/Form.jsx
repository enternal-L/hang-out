import Link from "next/link"

//form
const Form = ({ post, setPost, submitting, handleSubmit}) => {
    return (
      <section className='w-full max-w-full flex-start flex-col'>
          <form onSubmit={handleSubmit} className='mt-10 w-full max-w-2x1 flex flex-col gap-7 glassmorphism'>
            <label>
              <textarea 
                value={post.subject}
                onChange={(e) => setPost({...post, subject: e.target.value})}
                placeholder='Subject'
                required
                className='form_textarea'
              />
              <textarea 
                value={post.media}
                onChange={(e) => setPost({...post, media: e.target.value})}
                placeholder='Media'
                className='form_textarea'
              />
              <textarea 
                value={post.description}
                onChange={(e) => setPost({...post, description: e.target.value})}
                placeholder='Description'
                className='form_textarea'
              />
            </label>
            <Link href="/Home"
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
          > submit
          </Link>
          </form>
      </section>
    )
  }

export default Form