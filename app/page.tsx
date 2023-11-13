import { Button } from "@mui/material"
import Rating from "@mui/material/Rating"

export default function Home() {
  return (
    <section>
      <h1 className="text-center text-xl font-extrabold text-red-900">Home</h1>
      <Button variant="contained" className="bg-purple-900 hover:bg-red-900">
        helllooooooooo
      </Button>
      <Rating name="read-only" value={3} />
    </section>
  )
}
