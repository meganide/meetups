import Image from "next/image"

import type { Meetup } from "@prisma/client"

type MeetupCardProps = {
  meetup: Meetup
}

export default function Meetupcard({ meetup }: MeetupCardProps) {
  return (
    <article className="flex w-full cursor-pointer rounded-lg bg-red-50 shadow-lg transition-shadow duration-300 hover:bg-red-100">
      <section className="relative overflow-hidden rounded-lg">
        <Image
          width={200}
          height={120}
          alt="meetup pictures"
          src={`/meetupPics/${meetup.id}.png`}
          className="object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 truncate bg-red-600 px-2 py-1 text-sm font-bold text-white">
          {meetup.name}
        </div>
      </section>
      <section className="flex flex-1 flex-col justify-between p-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            {new Date(meetup.date).toLocaleString()}
          </h2>
          <p className="text-gray-500">{meetup.location}</p>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-600">
          <p>{meetup.city}</p>
          <p>{meetup.numberOfTickets} tickets</p>
        </div>
      </section>
    </article>
  )
}
