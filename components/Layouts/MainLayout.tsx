"use client"

import Box from "@mui/material/Box"
import CssBaseline from "@mui/material/CssBaseline"
import { useSession } from "next-auth/react"

import Appbar from "@/components/Appbar/Appbar"
import Drawer from "@/components/Drawer/Drawer"
import { DrawerHeader } from "@/components/Drawer/DrawerHeader"
import { Main } from "@/components/Layouts/Main"
import { useDrawer } from "@/hooks/useDrawer"

type MainLayoutProps = {
  children: React.ReactNode
  drawerWidth: number
}

export default function MainLayout({ children, drawerWidth }: MainLayoutProps) {
  const { data: session } = useSession()
  const { open, handleDrawerClose, handleDrawerOpen } = useDrawer()

  if (!session) {
    return <main>{children}</main>
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Appbar
        open={open}
        drawerWidth={drawerWidth}
        onDrawerOpen={handleDrawerOpen}
      />
      <Drawer
        drawerWidth={drawerWidth}
        open={open}
        onDrawerClose={handleDrawerClose}
      />
      <Main open={open} drawerwidth={drawerWidth}>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  )
}
