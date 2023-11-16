import { useMemo, useState } from "react"

import { useQuery } from "@tanstack/react-query"

import { httpGetMeetups } from "@/lib/httpRequests/meetups"

import type { Meetup } from "@prisma/client"

export function useMeetups() {
  const [searchQuery, setSearchQuery] = useState<string>("")
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
          !searchQuery ||
          meetup.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          meetup.keywords.some((keyword) =>
            keyword.toLowerCase().includes(searchQuery.toLowerCase())
          )
      ),
    [data?.meetups, searchQuery]
  )

  return {
    searchQuery,
    setSearchQuery,
    error,
    isLoading,
    searchOptions,
    matchingMeetups,
  }
}
