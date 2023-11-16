/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useMemo, useState } from "react"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useSession } from "next-auth/react"

import {
  httpAddReview,
  httpGetMeetups,
  httpJoinMeetup,
} from "@/lib/httpRequests/meetups"

import type { MeetupWithAttendees } from "@/types/general"

export function useMeetup(meetupId: string) {
  const [reviewOptions, setReviewOptions] = useState({
    rating: 5,
    comment: "",
  })

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
    isPending,
    mutateAsync: mutateJoinMeetupAsync,
  } = useMutation({
    mutationFn: async () => httpJoinMeetup(meetupId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meetups"] })
    },
  })

  const {
    data: addReviewData,
    isPending: isPendingAddReview,
    mutateAsync: mutateAddReviewAsync,
  } = useMutation({
    mutationFn: async () => httpAddReview(meetupId, reviewOptions),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meetups"] })
      setReviewOptions({
        rating: 5,
        comment: "",
      })
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
    await mutateJoinMeetupAsync()
  }, [mutateJoinMeetupAsync])

  const handleAddReview = useCallback(async () => {
    await mutateAddReviewAsync()
  }, [mutateAddReviewAsync])

  const handleChangeRating = useCallback((newValue: number | null) => {
    if (newValue) {
      setReviewOptions((prev) => ({
        ...prev,
        rating: newValue,
      }))
    }
  }, [])

  const handleChangeComment = useCallback((newValue: string) => {
    setReviewOptions((prev) => ({
      ...prev,
      comment: newValue,
    }))
  }, [])

  return {
    meetup,
    handleRegistration,
    joinMeetupData,
    isPending,
    hasJoined,
    handleAddReview,
    reviewOptions,
    handleChangeRating,
    handleChangeComment,
    addReviewData,
    isPendingAddReview,
  }
}
