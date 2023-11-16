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
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: "You need to be logged in to join a meetup!" },
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

    if (attendee) {
      return NextResponse.json(
        { error: "You have already joined this meetup!" },
        { status: 409 }
      )
    }

    if (meetup.attendees.length >= meetup?.numberOfTickets) {
      return NextResponse.json(
        { error: "This meetup is already full!" },
        { status: 409 }
      )
    }

    await db.meetup.update({
      where: { id: meetupId },
      data: {
        numberOfTickets: { decrement: 1 },
        attendees: {
          connect: { id: session.user.id },
        },
      },
    })

    return NextResponse.json(
      { message: "Successfully joined meetup." },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong when joining meetup. Try again!" },
      { status: 500 }
    )
  }
}
