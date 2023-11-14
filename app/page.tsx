import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import authOptions from "@/lib/auth"

export default async function Home() {
  // const { data: session, status } = useSession()
  const session = await getServerSession(authOptions)

  if (!session) {
    return redirect("/signin")
  }

  return (
    <section>
      <p>You are logged in as {session.user.email}!</p>
    </section>
  )
}
