export function hasPassed(meetupDate: Date) {
  return new Date(meetupDate).getTime() < Date.now()
}
