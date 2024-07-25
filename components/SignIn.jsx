import Link from "next/link";

const SignIn = () => {
  return (
    <nav className="flex-col w-full mb-16 py-56 px-96">
      <Link href = '/Home' className="black_btn ">
          SignIn
      </Link>
      <Link href = '/' className="black_btn">
          SignOut
      </Link>
    </nav>
  )
}

export default SignIn