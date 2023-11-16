import { useMemo } from "react"

import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"

import { hasPassed } from "@/lib/date"
import { httpGetMeetups } from "@/lib/httpRequests/meetups"

import type { MeetupWithAttendees } from "@/types/general"

export function useProfile() {
  const { data: session } = useSession()
  const { data } = useQuery<{
    meetups: MeetupWithAttendees[]
  }>({
    queryKey: ["meetups"],
    queryFn: httpGetMeetups,
  })

  const registeredMeetups = useMemo(
    () =>
      data?.meetups.filter((meetup) =>
        meetup.attendees.some((attendee) => attendee.id === session?.user.id)
      ),
    [data?.meetups, session?.user.id]
  )

  const upcomingMeetups = useMemo(
    () =>
      registeredMeetups?.filter(
        (meetup) => new Date(meetup.date).getTime() > Date.now()
      ),
    [registeredMeetups]
  )

  const pastMeetups = useMemo(
    () => registeredMeetups?.filter((meetup) => hasPassed(meetup.date)),
    [registeredMeetups]
  )

  return { session, upcomingMeetups, pastMeetups }
}
