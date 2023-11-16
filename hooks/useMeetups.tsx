import { useCallback, useMemo, useReducer } from "react"

import { useQuery } from "@tanstack/react-query"
import dayjs from "dayjs"

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
      data?.meetups
        .map((meetup) => meetup.keywords.concat(meetup.name))
        .flat() ?? [],
    [data]
  )

  const cityOptions = useMemo(
    () => data?.meetups.map((meetup) => meetup.city) ?? [],
    [data]
  )

  const categoryOptions = useMemo(
    () => data?.meetups.map((meetup) => meetup.category) ?? [],
    [data]
  )

  function filterBySearch(meetup: Meetup, searchQuery: string) {
    return (
      !searchQuery ||
      meetup.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meetup.keywords.some((keyword) =>
        keyword.toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
  }

  function filterByDate(meetup: Meetup, date: string) {
    return !date || dayjs(meetup.date).format("YYYY-MM-DD") === date
  }

  function filterByCity(meetup: Meetup, city: string) {
    return !city || meetup.city.toLowerCase().includes(city.toLowerCase())
  }

  function filterByCategory(meetup: Meetup, category: string) {
    return (
      !category ||
      meetup.category.toLowerCase().includes(category.toLowerCase())
    )
  }

  const handleSearchInputChange = useCallback((newValue: string) => {
    dispatchMeetupFilter({ type: "CHANGE_SEARCH_QUERY", payload: newValue })
  }, [])

  const handleDateChange = useCallback((newValue: string) => {
    dispatchMeetupFilter({ type: "CHANGE_DATE", payload: newValue })
  }, [])

  const handleCityChange = useCallback((newValue: string) => {
    dispatchMeetupFilter({ type: "CHANGE_CITY", payload: newValue })
  }, [])

  const handleCategoryChange = useCallback((newValue: string) => {
    dispatchMeetupFilter({ type: "CHANGE_CATEGORY", payload: newValue })
  }, [])

  const matchingMeetups = useMemo(
    () =>
      data?.meetups.filter(
        (meetup: Meetup) =>
          filterBySearch(meetup, meetupFilterState.searchQuery) &&
          filterByDate(meetup, meetupFilterState.date) &&
          filterByCity(meetup, meetupFilterState.city) &&
          filterByCategory(meetup, meetupFilterState.category)
      ),
    [data, meetupFilterState]
  )

  return {
    meetupFilterState,
    dispatchMeetupFilter,
    error,
    isLoading,
    searchOptions,
    cityOptions,
    categoryOptions,
    matchingMeetups,
    handleSearchInputChange,
    handleDateChange,
    handleCityChange,
    handleCategoryChange,
  }
}
