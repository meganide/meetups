"use client"

import Image from "next/image"

import MeetupList from "@/components/Meetup/MeetupList"
import { useProfile } from "@/hooks/useProfile"

export default function Profile() {
  const { session, pastMeetups, upcomingMeetups } = useProfile()

  return (
    <section>
      <h1 className="my-5 text-2xl font-extrabold">Profile</h1>
      <section className="flex items-center gap-3">
        <Image
          src={`https://api.multiavatar.com/${session?.user.id}.svg`}
          width={60}
          height={60}
          alt="avatar"
        />
        <p>{session?.user.email}</p>
      </section>
      <section>
        <h2 className="mb-5 mt-10 text-xl font-extrabold">Upcoming Meetups</h2>
        <MeetupList meetups={upcomingMeetups} />
      </section>
      <section>
        <h2 className="mb-5 mt-10 text-xl font-extrabold">Past Meetups</h2>
        <MeetupList meetups={pastMeetups} hideTicketsLeft />
      </section>
    </section>
  )
}
