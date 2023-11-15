import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import Avatar from "@mui/material/Avatar"
import Divider from "@mui/material/Divider"
import MUIDrawer from "@mui/material/Drawer"
import IconButton from "@mui/material/IconButton"
import List from "@mui/material/List"
import { useTheme } from "@mui/material/styles"
import Image from "next/image"

import Logo from "@/app/icon.png"
import { DrawerHeader } from "@/components/Drawer/DrawerHeader"
import DrawerItemList from "@/components/Drawer/DrawerItemList"

type DrawerProps = {
  drawerWidth: number
  open: boolean
  onDrawerClose: () => void
}

export default function Drawer({
  drawerWidth,
  open,
  onDrawerClose,
}: DrawerProps) {
  const theme = useTheme()

  return (
    <MUIDrawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main", mx: "auto" }}>
          <Image src={Logo} alt="Logo" />
        </Avatar>
        <IconButton onClick={onDrawerClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <DrawerItemList />
      </List>
    </MUIDrawer>
  )
}
