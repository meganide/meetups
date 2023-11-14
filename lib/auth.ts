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
  secret: process.env.JWT_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string
          password: string
        }

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
}

export default authOptions
