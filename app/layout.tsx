import { Inter } from "next/font/google"

import Providers from "@/app/providers"
import RequireAuth from "@/components/Auth/RequireAuth"
import MainLayout from "@/components/Layouts/MainLayout"

import type { Metadata } from "next"

import "@/styles/globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Meetups",
  description: "Find meetups near you",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <RequireAuth>
            <MainLayout drawerWidth={240}>{children}</MainLayout>
          </RequireAuth>
        </Providers>
      </body>
    </html>
  )
}
