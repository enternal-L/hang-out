import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs";

import User from "@models/user";
import { connectDB } from "@utils/mongodb";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},

            async authorize(credentials) {
                const { username , password } = credentials;

                try{
                    await connectDB();
                    const user = await User.findOne({ username });

                    if(!user){
                        return null;
                    }

                    const passCheck = await bcrypt.compare(password, user.password);

                    if(!passCheck){
                        return null;
                    }

                    else{
                        return user;
                    }
                } catch(error){
                    console.log("Error Occured ", error);
                }
            }

        })
    ],
    
    session: {
        strategy: "jwt",
    },

    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/"
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };