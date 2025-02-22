import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectdb } from "./connectdb";
import { NextResponse } from "next/server";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";

export const authOptions : NextAuthOptions = {
    providers:[
        CredentialsProvider({
            name: "credentials",
            credentials:{
                email: { label: "Email" , type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req){
                if(!credentials?.email || !credentials?.password){
                    return null
                }

                try { 
                    await connectdb()
                    const user = await User.findOne({email : credentials.email})
                    if(!user){
                        return null
                    }

                    const isPasswordCorrect = await bcrypt.compare(credentials.password,user.password)
                    if(!isPasswordCorrect){
                        return null
                    }
                    return {
                        id: user._id.toString(),
                        email: user.email
                    }
                } catch (error) {
                    console.log("authorization failed!",error)
                    throw error
                }
            }
        })
    ],
    callbacks:{
        async jwt({token,user}){
            if(user){
                token.email = user.email
            }
            return token
        },
        async session({session,token}){
            if(session.user){
                session.user.email = token.email
            }
            return session;
        }
    },
    session:{
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60
    },
    pages:{
        signIn: '/auth/login',
    },
    secret:process.env.NEXTAUTH_SECRET
}