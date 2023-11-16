import Meetupcard from "@/components/Meetup/Meetupcard"

import type { Meetup } from "@prisma/client"

type MeetupListProps = {
  meetups: Meetup[] | undefined
}

export default function MeetupList({ meetups }: MeetupListProps) {
  return (
    <section className="flex max-h-[600px] flex-col gap-3 overflow-y-auto">
      {meetups && meetups.length > 0
        ? meetups.map((meetup: Meetup) => (
            <Meetupcard key={meetup.id} meetup={meetup} />
          ))
        : "No meetups found"}
    </section>
  )
}
