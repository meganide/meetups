import Image from "next/image"

import type { Meetup } from "@prisma/client"

type MeetupDetailProps = {
  meetup: Meetup
}

export default function MeetupDetail({ meetup }: MeetupDetailProps) {
  const handleRegistration = () => {
    console.log("User registered for", meetup?.name)
  }

  if (!meetup) {
    return <div>Loading meetup details...</div>
  }

  return (
    <section className="p-4">
      <Image
        width={200}
        height={120}
        alt="meetup pictures"
        src={`/meetupPics/${meetup.id}.png`}
        className="object-cover"
      />
      <h1 className="text-2xl font-bold">{meetup.name}</h1>
      <p className="mt-2 text-lg">{meetup.description}</p>
      <div className="mt-4">
        <p>tickets: {meetup.numberOfTickets}</p>
      </div>
      <button
        type="button"
        className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        onClick={handleRegistration}
      >
        Register
      </button>
    </section>
  )
}