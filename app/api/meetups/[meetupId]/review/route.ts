import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"

import authOptions from "@/lib/auth"
import db from "@/lib/db"

type Context = {
  params: { meetupId: string }
}

export async function POST(req: Request, context: Context) {
  try {
    const { meetupId } = context.params
    const { comment, rating } = (await req.json()) as {
      comment: string
      rating: number
    }
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: "You need to be logged in to write a review!" },
        { status: 401 }
      )
    }

    const meetup = await db.meetup.findUnique({
      where: { id: meetupId },
      select: { attendees: true, numberOfTickets: true },
    })

    if (!meetup) {
      return NextResponse.json(
        { error: "This meetup does not exist!" },
        { status: 404 }
      )
    }

    const attendee = meetup.attendees.find(
      (attendee) => attendee.id === session.user.id
    )

    if (!attendee) {
      return NextResponse.json(
        { error: "You can't leave a review on a meetup you haven't attended!" },
        { status: 401 }
      )
    }

    await db.review.create({
      data: {
        description: comment,
        rating,
        meetup: {
          connect: { id: meetupId },
        },
      },
    })

    return NextResponse.json(
      { message: "Successfully wrote review!" },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong when joining meetup. Try again!" },
      { status: 500 }
    )
  }
}
