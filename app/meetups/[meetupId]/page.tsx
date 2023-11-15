export default function Meetup({ params }: { params: { meetupId: string } }) {
  return <div>My Post: {params.meetupId}</div>
}
