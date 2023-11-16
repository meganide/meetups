import Meetupcard from "@/components/Meetup/Meetupcard"

import type { MeetupWithAttendees } from "@/types/general"

type MeetupListProps = {
  meetups: MeetupWithAttendees[] | undefined
  hideTicketsLeft?: boolean
}

export default function MeetupList({
  meetups,
  hideTicketsLeft,
}: MeetupListProps) {
  return (
    <section className="flex max-h-[600px] flex-col gap-3 overflow-y-auto">
      {meetups && meetups.length > 0
        ? meetups.map((meetup: MeetupWithAttendees) => (
            <Meetupcard
              key={meetup.id}
              meetup={meetup}
              hideTicketsLeft={hideTicketsLeft}
            />
          ))
        : "No meetups found"}
    </section>
  )
}
