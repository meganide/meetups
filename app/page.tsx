import { getServerSession } from "next-auth"

import Signup from "@/components/Signup"
import authOptions from "@/lib/auth"

export default async function Home() {
  // const { data: session, status } = useSession()
  const session = await getServerSession(authOptions)

  return (
    <section>
      {session ? <p>You are logged in as {session.user.email}!</p> : <Signup />}
    </section>
  )
}
