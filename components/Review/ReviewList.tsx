import Image from "next/image"

import HeartRating from "./HeartRating"

import type { Review } from "@prisma/client"

type ReviewListProps = {
  reviews: Review[]
}

export default function ReviewList({ reviews }: ReviewListProps) {
  return (
    <>
      {reviews.map((review) => (
        <section key={review.id} className="my-6 flex items-center gap-2">
          <Image
            src={`https://api.multiavatar.com/${review.id}.svg`}
            width={60}
            height={60}
            alt="avatar"
          />
          <section className="flex flex-col gap-1">
            <HeartRating readOnly rating={review.rating} />
            <p>{review.description}</p>
          </section>
        </section>
      ))}
    </>
  )
}
