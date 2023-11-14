import { Typography } from "@mui/material"

export default function Copyright() {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      className="mt-2"
    >
      {"Copyright © Meetups "}
      {new Date().getFullYear()}.
    </Typography>
  )
}
