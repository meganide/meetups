import MenuIcon from "@mui/icons-material/Menu"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import { signOut } from "next-auth/react"

import { MUIAppBar } from "@/components/Appbar/MUIAppbar"

import type { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar"

interface AppBarProps extends MuiAppBarProps {
  open: boolean
  drawerWidth: number
  onDrawerOpen: () => void
}

export default function Appbar({
  open,
  drawerWidth,
  onDrawerOpen,
}: AppBarProps) {
  return (
    <MUIAppBar
      position="fixed"
      open={open}
      drawerWidth={drawerWidth}
      color="error"
    >
      <Toolbar className="flex justify-between">
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={onDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Meetups
          </Typography>
        </Box>
        <Button color="inherit" onClick={() => signOut()}>
          Sign out
        </Button>
      </Toolbar>
    </MUIAppBar>
  )
}
