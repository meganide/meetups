/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react"

import MUIAutocomplete from "@mui/material/Autocomplete"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"

type AutocompleteProps = {
  options: string[]
  searchQuery: string
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
}

export default function Autocomplete({
  options,
  searchQuery,
  setSearchQuery,
}: AutocompleteProps) {
  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      <MUIAutocomplete
        id="free-solo"
        freeSolo
        inputValue={searchQuery}
        onInputChange={(event: any, newValue: string) => {
          setSearchQuery(newValue)
        }}
        options={options}
        renderInput={(params) => (
          <TextField {...params} label="Search meetups" />
        )}
      />
    </Stack>
  )
}
