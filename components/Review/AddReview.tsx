import React from "react"

import TextField from "@mui/material/TextField"

import HeartRating from "./HeartRating"

import type { ReviewOptions } from "@/types/general"

type RatingProps = {
  reviewOptions: ReviewOptions
  handleChangeRating: (newValue: number | null) => void
  handleChangeComment: (newValue: string) => void
  handleAddReview: () => Promise<void>
  isPendingAddReview: boolean
}

export default function AddReview({
  reviewOptions,
  handleAddReview,
  isPendingAddReview,
  handleChangeRating,
  handleChangeComment,
}: RatingProps) {
  return (
    <section className="mt-4">
      <h2 className="mb-2 text-xl font-bold">Write a review</h2>
      <section className="flex flex-col gap-4">
        <HeartRating
          rating={reviewOptions.rating}
          onChange={handleChangeRating}
        />
        <TextField
          id="standard-multiline-flexible"
          label="Comment"
          multiline
          rows={4}
          variant="outlined"
          value={reviewOptions.comment}
          onChange={(e) => handleChangeComment(e.target.value)}
        />
        <button
          type="button"
          className="self-start rounded bg-green-500 px-6 py-2 text-white hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={handleAddReview}
          disabled={isPendingAddReview}
        >
          {isPendingAddReview ? "Loading..." : "Review"}
        </button>
      </section>
    </section>
  )
}
