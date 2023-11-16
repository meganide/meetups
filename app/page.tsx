"use client"

import useSWR from "swr"

import Meetupcard from "@/components/Meetup/Meetupcard"

import type { Meetup } from "@prisma/client"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Home() {
  const { data, error, isLoading } = useSWR("/api/meetups", fetcher)

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
