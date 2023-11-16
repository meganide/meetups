"use client"

import Box from "@mui/material/Box"
import CircularProgress from "@mui/material/CircularProgress"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"

import Autocomplete from "@/components/Autocomplete"
import MeetupList from "@/components/Meetup/MeetupList"
import { useMeetups } from "@/hooks/useMeetups"

export default function Home() {
  const {
    error,
    isLoading,
    matchingMeetups,
    searchOptions,
    meetupFilterState,
    handleSearchInputChange,
  } = useMeetups()

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
          <section className="mb-3 flex gap-2">
            <Autocomplete
              options={searchOptions ?? []}
              inputValue={meetupFilterState.searchQuery}
              onInputChange={handleSearchInputChange}
            />
            <DatePicker
              label="Date"
              slotProps={{ field: { clearable: true } }}
              format="YYYY-MM-DD"
            />
          </section>
          <section className="flex max-h-[600px] flex-col gap-3 overflow-y-auto">
            {matchingMeetups && matchingMeetups.length > 0 ? (
              <MeetupList meetups={matchingMeetups} />
            ) : (
              "No meetups found"
            )}
          </section>
        </section>
      )}
    </section>
  )
}
