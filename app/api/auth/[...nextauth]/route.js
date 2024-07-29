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

                    return user;
                } catch(error){
                    console.log("Error Occured ", error);
                }
            }

        })
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.username;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.name = token.name;
            return session;
        }
    },
    
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