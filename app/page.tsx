"use client"

import { useQuery } from "@tanstack/react-query"

import Meetupcard from "@/components/Meetup/Meetupcard"
import { httpGetMeetups } from "@/lib/httpRequests/meetups"

import type { Meetup } from "@prisma/client"

export default function Home() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["meetups"],
    queryFn: httpGetMeetups,
  })

  if (error) return <div>Failed to load meetups</div>
  if (isLoading) return <div>Loading...</div>

  return (
    <section>
      <h1 className="my-5 text-xl font-extrabold">Upcoming Meetups</h1>
      <section className="flex flex-col gap-3">
        {data.meetups.map((meetup: Meetup) => (
          <Meetupcard key={meetup.id} meetup={meetup} />
        ))}
      </section>
    </section>
  )
}
