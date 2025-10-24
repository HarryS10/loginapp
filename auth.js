// auth.js
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { connectMONGODB } from "@/lib/mongodb";
import User from "@/modules/user";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Credentials({
            name: "credentials",
            credentials: {},
            async authorize(credentials) {
                const { email, password } = credentials;

                await connectMONGODB();
                const user = await User.findOne({ email });
                if (!user) return null;

                const passwordsMatch = await bcrypt.compare(password, user.password);
                if (!passwordsMatch) return null;

                return user;
            },
        }),
    ],
    session: { strategy: "jwt" },
    secret: process.env.NEXTAUTH_SECRET,
    pages: { signIn: "/" },
});
