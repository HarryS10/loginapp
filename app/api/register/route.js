import { NextResponse } from "next/server";
import {connectMONGODB} from "@/lib/mongodb";
import User from "@/modules/user";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        const { name, email, password } = await req.json();
        const hashedPassword = await bcrypt.hash(password, 10);
        await connectMONGODB();
        await User.create({name, email, password: hashedPassword});

        return NextResponse.json(
            { message: "User registered." },
            {
                status: 201,
                headers: { "Content-Type": "application/json" },
            }
        );
    } catch (error) {
        console.error("Error registering user:", error);

        // Error response
        return NextResponse.json(
            { message: "An error occurred while registering user." },
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}
