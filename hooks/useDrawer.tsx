import { useState } from "react"

export function useDrawer() {
  const [open, setOpen] = useState(true)

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  return { open, handleDrawerClose, handleDrawerOpen }
}
