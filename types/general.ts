import type { Prisma } from "@prisma/client"

export type MeetupWithAttendees = Prisma.MeetupGetPayload<{
  include: {
    attendees: {
      select: { id: true }
    }
  }
}>
