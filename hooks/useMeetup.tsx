import { useCallback, useMemo } from "react"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useSession } from "next-auth/react"

import { httpGetMeetups, httpJoinMeetup } from "@/lib/httpRequests/meetups"

import type { MeetupWithAttendees } from "@/types/general"

export function useMeetup(meetupId: string) {
  const { data: session } = useSession()
  const { data } = useQuery<{
    meetups: MeetupWithAttendees[]
  }>({
    queryKey: ["meetups"],
    queryFn: httpGetMeetups,
  })

  const queryClient = useQueryClient()

  const {
    data: joinMeetupData,
    error,
    isPending,
    mutateAsync,
  } = useMutation({
    mutationFn: async () => httpJoinMeetup(meetupId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meetups"] })
    },
  })

  const meetup = useMemo(
    () => data?.meetups.find((meetup) => meetup.id === meetupId),
    [data?.meetups, meetupId]
  )

  const hasJoined = useMemo(
    () =>
      meetup?.attendees.some((attendee) => attendee.id === session?.user.id),
    [meetup?.attendees, session?.user.id]
  )

  const handleRegistration = useCallback(async () => {
    await mutateAsync()
  }, [mutateAsync])

  return { meetup, handleRegistration, joinMeetupData, isPending, hasJoined }
}
