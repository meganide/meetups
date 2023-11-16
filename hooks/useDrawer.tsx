import { useCallback, useState } from "react"

export function useDrawer() {
  const [open, setOpen] = useState(true)

  const handleDrawerClose = useCallback(() => {
    setOpen(false)
  }, [])

  const handleDrawerOpen = useCallback(() => {
    setOpen(true)
  }, [])

  return { open, handleDrawerClose, handleDrawerOpen }
}
