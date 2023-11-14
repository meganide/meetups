import { NextResponse } from "next/server"

import { hashPassword } from "@/lib/bcrypt"
import db from "@/lib/db"

export async function POST(req: Request) {
  const { email, password } = await req.json()

  try {
    const user = await db.user.findUnique({
      where: { email },
    })

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      )
    }

    const hashedPassword = hashPassword(password)

    await db.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    })

    return NextResponse.json(
      { message: "Successfully created user." },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong when creating user. Try again!" },
      { status: 500 }
    )
  }
}
