import Image from "next/image"

import type { Meetup } from "@prisma/client"

type MeetupCardProps = {
  meetup: Meetup
}

export default function Meetupcard({ meetup }: MeetupCardProps) {
  return (
    <article className="flex w-full cursor-pointer gap-5 bg-red-50 shadow-md hover:bg-red-100">
      <section className="overflow-hidden rounded-md border">
        <Image
          width={200}
          height={120}
          alt="meetup pictures"
          src={`/meetupPics/${meetup.id}.png`}
        />
      </section>
      <section>
        <h2>{new Date(meetup.date).toLocaleString()}</h2>
        <h3>{meetup.name}</h3>
        <p>{meetup.location}</p>
        <p>{meetup.city}</p>
        <p>{meetup.numberOfTickets}</p>
      </section>
    </article>
  )
}

// visa på kortet :name, date, location, city, numberOfTickets
