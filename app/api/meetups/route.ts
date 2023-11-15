import { NextResponse } from "next/server"

import db from "@/lib/db"

export async function GET() {
  try {
    const meetups = await db.meetup.findMany({
      orderBy: {
        date: "asc",
      },
    })
    return NextResponse.json({ meetups }, { status: 200 })
  } catch (err) {
    console.log(err)
    return NextResponse.json(
      { error: "Something went wrong when fetching meetups. Try again!" },
      { status: 500 }
    )
  }
}
