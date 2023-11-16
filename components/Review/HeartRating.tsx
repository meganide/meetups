/* eslint-disable @typescript-eslint/no-explicit-any */
import FavoriteIcon from "@mui/icons-material/Favorite"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import Rating from "@mui/material/Rating"
import { styled } from "@mui/material/styles"

type HeartRatingProps = {
  rating: number
  onChange?: (newValue: number | null) => void
  readOnly?: boolean
}

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
})

export default function HeartRating({
  rating,
  onChange,
  readOnly,
}: HeartRatingProps) {
  return (
    <StyledRating
      name="customized-color"
      defaultValue={5}
      getLabelText={(value: number) =>
        `${value} Heart${value !== 1 ? "s" : ""}`
      }
      precision={1}
      icon={<FavoriteIcon fontSize="inherit" />}
      emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
      value={rating}
      onChange={(event: any, newValue: number | null) => {
        if (onChange) onChange(newValue)
      }}
      readOnly={readOnly}
    />
  )
}
