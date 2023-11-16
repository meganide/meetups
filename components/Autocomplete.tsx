/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react"

import MUIAutocomplete from "@mui/material/Autocomplete"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"

type AutocompleteProps = {
  options: string[]
  inputValue: string
  onInputChange: (newValue: string) => void
  label: string
}

export default function Autocomplete({
  options,
  inputValue,
  onInputChange,
  label,
}: AutocompleteProps) {
  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      <MUIAutocomplete
        id="free-solo"
        freeSolo
        inputValue={inputValue}
        onInputChange={(event: any, newValue: string) =>
          onInputChange(newValue)
        }
        options={options}
        renderInput={(params) => <TextField {...params} label={label} />}
      />
    </Stack>
  )
}
