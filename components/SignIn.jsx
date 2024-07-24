import Link from "next/link";

const SignIn = () => {
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href = '/Home' className="black_btn">
          SignIn
      </Link>
      <Link href = '/' className="black_btn">
          SignOut
      </Link>
    </nav>
  )
}

export default SignIn