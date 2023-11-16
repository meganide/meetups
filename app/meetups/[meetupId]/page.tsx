"use client"

import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import Image from "next/image"
import Link from "next/link"

import { useMeetup } from "@/hooks/useMeetup"

export default function MeetupPage({
  params,
}: {
  params: { meetupId: string }
}) {
  const { meetup, handleRegistration, joinMeetupData, isPending, hasJoined } =
    useMeetup(params.meetupId)

  function buttonStates() {
    if (hasJoined) {
      return "Confirmed"
    }

    if (isPending) {
      return "Loading..."
    }

    return "Register"
  }

  return (
    <section className="flex flex-col items-center bg-red-50 p-6">
      <div className="w-full max-w-4xl rounded-lg bg-white p-8 shadow-xl">
        <Link href="/">
          <ArrowBackIcon />
          <span className="ml-2">Back to meetups</span>
        </Link>
        <div className="mt-6 flex">
          <div className="w-1/3">
            <Image
              width={700}
              height={450}
              alt="meetup pictures"
              src={`/meetupPics/${meetup?.id}.png`}
              className="rounded-md object-cover shadow-lg"
            />
          </div>
          <div className="flex w-2/3 flex-col justify-between pl-8">
            <div>
              <h1 className="text-3xl font-bold">{meetup?.name}</h1>
              <p className="mt-2 text-lg">{meetup?.description}</p>
            </div>
            <div>
              <p className="text-md mt-2">
                Location: <strong>{meetup?.location}</strong>
              </p>
              <p className="text-md">
                Date:{" "}
                <strong>
                  {meetup?.date
                    ? new Date(meetup.date).toLocaleString()
                    : "N/A"}
                </strong>
              </p>
              <p className="text-md">
                Category: <strong>{meetup?.category}</strong>
              </p>
              <p className="text-md">
                City: <strong>{meetup?.city}</strong>
              </p>
              <p className="text-md">
                Organizer: <strong>{meetup?.organizer}</strong>
              </p>
              <p className="text-md">
                Tickets: <strong>{meetup?.numberOfTickets}</strong>
              </p>
            </div>
            <button
              type="button"
              className="mt-4 self-start rounded bg-green-500 px-6 py-2 text-white hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={handleRegistration}
              disabled={isPending || hasJoined}
            >
              {buttonStates()}
            </button>
            {joinMeetupData?.error && (
              <p className="mt-2 text-red-800">{joinMeetupData.error}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
