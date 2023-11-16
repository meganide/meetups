import ReviewList from "./ReviewList"

import type { Review } from "@prisma/client"

type ReviewsProps = {
  reviews: Review[]
}

export default function Reviews({ reviews }: ReviewsProps) {
  return (
    <section className="mt-8 max-h-[400px] overflow-y-auto">
      <h2 className="mb-2 text-xl font-bold">Reviews</h2>
      {reviews.length > 0 ? <ReviewList reviews={reviews} /> : "No reviews yet"}
    </section>
  )
}
