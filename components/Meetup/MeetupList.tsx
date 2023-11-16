import Meetupcard from "@/components/Meetup/Meetupcard"

import type { Meetup } from "@prisma/client"

type MeetupListProps = {
  meetups: Meetup[]
}

export default function MeetupList({ meetups }: MeetupListProps) {
  return (
    <>
      {meetups.map((meetup: Meetup) => (
        <Meetupcard key={meetup.id} meetup={meetup} />
      ))}
    </>
  )
}
