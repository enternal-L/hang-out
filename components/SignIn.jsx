import Link from "next/link";
import Image from "next/image";

const SignIn = () => {
  return (
    <div className="w-full h-full flex-center flex-col custom_color">
      <Image src = "/logo.svg"
                  width = {470} 
                  height = {470}
                  className="object-contain"/>
      <div className="w-full login_container">
        <nav className="flex flex-col bg-white rounded-3xl w-full h-full gap-4 py-5 px-28">
          <input
                  placeholder='Username'
                  required
                  className='form_input'
          />
          <input
                  placeholder='Password'
                  required
                  className='form_input'
          />
          <Link href = '/Home' className="blue_btn text-base mt-4">
              Sign In
          </Link>
        </nav>
      </div>
    </div>
  )
}

export default SignIn