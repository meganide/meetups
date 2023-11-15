import FestivalIcon from "@mui/icons-material/Festival"
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import { useRouter } from "next/navigation"

const drawerItems = [
  {
    text: "Meetups",
    icon: <FestivalIcon />,
    url: "/",
  },
  {
    text: "Profile",
    icon: <TheaterComedyIcon />,
    url: "/profile",
  },
]

export default function DrawerItemList() {
  const router = useRouter()

  return (
    <>
      {drawerItems.map((drawerItem) => (
        <ListItem
          key={drawerItem.text}
          disablePadding
          onClick={() => router.push(drawerItem.url)}
        >
          <ListItemButton>
            <ListItemIcon>{drawerItem.icon}</ListItemIcon>
            <ListItemText primary={drawerItem.text} />
          </ListItemButton>
        </ListItem>
      ))}
    </>
  )
}
