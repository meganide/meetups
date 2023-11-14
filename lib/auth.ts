import { PrismaAdapter } from "@auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials"

import { comparePassword } from "@/lib/bcrypt"
import db from "@/lib/db"

import type { NextAuthOptions } from "next-auth"

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials

        // Add logic here to look up the user from the credentials supplied

        const user = await db.user.findUnique({
          where: { email },
        })

        if (!user) {
          return null
        }

        const isCorrectPassword = comparePassword(password, user.password)

        if (!isCorrectPassword) {
          // If you return null then an error will be displayed advising the user to check their details.
          return null
        }

        // Any object returned will be saved in `user` property of the JWT
        return { id: user.id, email: user.email }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
}

export default authOptions
