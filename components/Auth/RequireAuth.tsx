"use client"

import { redirect, usePathname } from "next/navigation"
import { useSession } from "next-auth/react"

const noAuthPaths = ["/signin", "/signup"]

export default function RequireAuth({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session } = useSession()
  const pathname = usePathname()

  if (!session && !noAuthPaths.includes(pathname)) {
    return redirect("/signin")
  }

  return children
}
