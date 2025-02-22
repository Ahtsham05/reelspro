import { connectdb } from "@/lib/connectdb";
import User from "@/models/user.model";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const { email , password } = await req.json();
    if(!email || !password) {
        return NextResponse.json(
            { 
                message: "Missing email or password",
                success: false,
                data: null
            }, 
            { 
                status: 400 
            }
        )
    }

    try {
        await connectdb();
        const user = await User.findOne({ email });
        if(user){
            return NextResponse.json(
                {
                    message: "User Already Existed!",
                    success: false,
                    data: null
                },
                {
                    status: 404
                }
            )
        }

        const response = await User.create({
            email,
            password
        })

        return NextResponse.json(
            {
                message: "User created successfully",
                success: true,
                data: response
            },
            {
                status: 200
            }
        )
    } catch (error) {
        console.log("Error creating user:", error);
        return NextResponse.json(
            {
                message: "An error occurred while creating the user",
                success: false,
                data: null
            },
            {
                status: 500
            }
        )
    }
}