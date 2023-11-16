import { useCallback, useMemo, useReducer } from "react"

import { useQuery } from "@tanstack/react-query"

import { httpGetMeetups } from "@/lib/httpRequests/meetups"
import {
  initalStateMeetupFilterReducer,
  meetupFilterReducer,
} from "@/reducers/meetupFilterReducer"

import type { Meetup } from "@prisma/client"

export function useMeetups() {
  const [meetupFilterState, dispatchMeetupFilter] = useReducer(
    meetupFilterReducer,
    initalStateMeetupFilterReducer
  )

  const { data, error, isLoading } = useQuery<{ meetups: Meetup[] }>({
    queryKey: ["meetups"],
    queryFn: httpGetMeetups,
  })

  const searchOptions = useMemo(
    () =>
      data?.meetups.map((meetup) => meetup.keywords.concat(meetup.name)).flat(),
    [data]
  )

  const matchingMeetups = useMemo(
    () =>
      data?.meetups.filter(
        (meetup: Meetup) =>
          !meetupFilterState.searchQuery ||
          meetup.name
            .toLowerCase()
            .includes(meetupFilterState.searchQuery.toLowerCase()) ||
          meetup.keywords.some((keyword) =>
            keyword
              .toLowerCase()
              .includes(meetupFilterState.searchQuery.toLowerCase())
          )
      ),
    [data?.meetups, meetupFilterState.searchQuery]
  )

  const handleSearchInputChange = useCallback((newValue: string) => {
    dispatchMeetupFilter({ type: "CHANGE_SEARCH_QUERY", payload: newValue })
  }, [])

  return {
    meetupFilterState,
    dispatchMeetupFilter,
    error,
    isLoading,
    searchOptions,
    matchingMeetups,
    handleSearchInputChange,
  }
}
