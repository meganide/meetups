"use client"

import Box from "@mui/material/Box"
import CircularProgress from "@mui/material/CircularProgress"

import MeetupFilters from "@/components/Meetup/MeetupFilters"
import MeetupList from "@/components/Meetup/MeetupList"
import { useMeetups } from "@/hooks/useMeetups"

export default function Home() {
  const { error, isLoading, matchingMeetups, ...filterOptions } = useMeetups()

  if (error) return <div>Failed to load meetups</div>

  return (
    <section>
      <h1 className="my-5 text-2xl font-extrabold">Upcoming Meetups</h1>
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 5 }}>
          <CircularProgress color="error" size="3rem" />
        </Box>
      ) : (
        <section>
          <MeetupFilters {...filterOptions} />
          <MeetupList meetups={matchingMeetups} />
        </section>
      )}
    </section>
  )
}
