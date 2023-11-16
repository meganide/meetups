import React from "react"

import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import dayjs from "dayjs"

import Autocomplete from "@/components/Autocomplete"

import type { MeetupFilterState } from "@/reducers/meetupFilterReducer"

type MeetupFiltersProps = {
  searchOptions: string[]
  cityOptions: string[]
  categoryOptions: string[]
  meetupFilterState: MeetupFilterState
  handleSearchInputChange: (newValue: string) => void
  handleDateChange: (newValue: string) => void
  handleCityChange: (newValue: string) => void
  handleCategoryChange: (newValue: string) => void
}

export default function MeetupFilters({
  searchOptions,
  cityOptions,
  categoryOptions,
  meetupFilterState,
  handleSearchInputChange,
  handleDateChange,
  handleCityChange,
  handleCategoryChange,
}: MeetupFiltersProps) {
  return (
    <section className="mb-3 flex gap-2">
      <Autocomplete
        options={searchOptions}
        label="Search meetups"
        inputValue={meetupFilterState.searchQuery}
        onInputChange={handleSearchInputChange}
      />
      <DatePicker
        label="Date"
        slotProps={{
          field: {
            clearable: true,
            onClear: () => handleDateChange(""),
          },
        }}
        format="YYYY-MM-DD"
        value={meetupFilterState.date}
        onChange={(newValue: string | null) => {
          if (newValue) {
            const formattedDate = dayjs(newValue).format("YYYY-MM-DD")
            handleDateChange(formattedDate)
          }
        }}
      />
      <Autocomplete
        options={cityOptions}
        inputValue={meetupFilterState.city}
        onInputChange={handleCityChange}
        label="City"
      />
      <Autocomplete
        options={categoryOptions}
        inputValue={meetupFilterState.category}
        onInputChange={handleCategoryChange}
        label="Category"
      />
    </section>
  )
}
