export async function httpGetMeetups() {
  const res = await fetch("/api/meetups")
  return res.json()
}
