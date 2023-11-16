import type { ReviewOptions } from "@/types/general"

export async function httpGetMeetups() {
  const res = await fetch("/api/meetups", {
    cache: "no-cache",
  })
  return res.json()
}
export async function httpJoinMeetup(meetupId: string) {
  const res = await fetch(`/api/meetups/${meetupId}/join`, {
    method: "POST",
    cache: "no-cache",
  })
  return res.json()
}

export async function httpAddReview(
  meetupId: string,
  reviewOptions: ReviewOptions
) {
  const res = await fetch(`/api/meetups/${meetupId}/review`, {
    method: "POST",
    body: JSON.stringify(reviewOptions),
    cache: "no-cache",
  })
  return res.json()
}
