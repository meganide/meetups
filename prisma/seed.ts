import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const meetups = [
  {
    name: "Tech Talks",
    date: "2023-12-10T18:00:00Z",
    location: "Tech Hub Center",
    description: "A series of talks on emerging technologies",
    category: "Technology",
    city: "San Francisco",
    keywords: ["innovation", "software", "networking"],
    numberOfTickets: 150,
    organizer: "Tech Innovators Inc.",
  },
  {
    name: "Yoga Retreat",
    date: "2023-11-15T08:00:00Z",
    location: "Sunny Meadows Park",
    description: "A day of yoga, meditation, and wellness",
    category: "Health & Wellness",
    city: "Austin",
    keywords: ["yoga", "meditation", "well-being"],
    numberOfTickets: 75,
    organizer: "Yoga Life",
  },
  {
    name: "Local Art Exhibit",
    date: "2023-11-25T17:00:00Z",
    location: "Downtown Art Gallery",
    description: "Showcasing local artists and their work",
    category: "Art",
    city: "New York",
    keywords: ["art", "exhibit", "culture"],
    numberOfTickets: 200,
    organizer: "Creative Minds",
  },
  {
    name: "Startup Pitch Night",
    date: "2023-12-05T19:00:00Z",
    location: "Innovation Hub",
    description: "New startups pitch their ideas to investors",
    category: "Business",
    city: "Silicon Valley",
    keywords: ["startups", "pitching", "investment"],
    numberOfTickets: 100,
    organizer: "Entrepreneurs Network",
  },
  {
    name: "Rock Music Festival",
    date: "2023-11-20T12:00:00Z",
    location: "Riverfront Arena",
    description: "A festival featuring top rock bands",
    category: "Music",
    city: "Chicago",
    keywords: ["music", "rock", "festival"],
    numberOfTickets: 500,
    organizer: "Rock On Entertainment",
  },
  {
    name: "Gourmet Food Fair",
    date: "2023-11-30T10:00:00Z",
    location: "City Central Park",
    description: "A culinary journey with top chefs and local vendors",
    category: "Food",
    city: "Los Angeles",
    keywords: ["food", "gourmet", "chefs"],
    numberOfTickets: 300,
    organizer: "Culinary Delights",
  },
  {
    name: "Book Lovers Meetup",
    date: "2023-12-15T15:00:00Z",
    location: "Main Library Hall",
    description: "A gathering for book enthusiasts and authors",
    category: "Literature",
    city: "Boston",
    keywords: ["books", "reading", "authors"],
    numberOfTickets: 120,
    organizer: "Bookworm Club",
  },
  {
    name: "Photography Workshop",
    date: "2023-12-01T09:00:00Z",
    location: "Lakeside Studio",
    description: "A hands-on workshop for photography lovers",
    category: "Photography",
    city: "Seattle",
    keywords: ["photography", "workshop", "camera"],
    numberOfTickets: 50,
    organizer: "Shutter Moments",
  },
  {
    name: "Coding Bootcamp",
    date: "2023-11-22T09:00:00Z",
    location: "Tech Learning Center",
    description: "Intensive coding bootcamp for beginners",
    category: "Education",
    city: "Denver",
    keywords: ["coding", "programming", "education"],
    numberOfTickets: 80,
    organizer: "Code Academy",
  },
  {
    name: "Adventure Hiking",
    date: "2023-12-20T07:00:00Z",
    location: "Mountain Trails",
    description: "Exploring scenic trails and nature",
    category: "Outdoor",
    city: "Portland",
    keywords: ["hiking", "adventure", "outdoors"],
    numberOfTickets: 60,
    organizer: "Trail Blazers",
  },
]

async function main() {
  await prisma.meetup.createMany({
    data: meetups,
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
