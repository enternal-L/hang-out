import Feed from "@components/Feed";
import Link from "next/link";
import SignUp from "@components/SignUp";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";

import React from 'react'

export default async function App() {
  const session = await getServerSession(authOptions);

  if(session) redirect("/Home")

  return (
    <SignUp></SignUp>
  )
}
