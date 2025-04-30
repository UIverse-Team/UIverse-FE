'use client'

import { useState } from 'react'
import Star from '/public/icons/star.svg?svgr'

interface StarRatingInputProps {
  initialRating?: number
  filledColor?: string
  emptyColor?: string
  length?: number
  onChange?: (rating: number) => void
}

export const StarRatingInput = ({
  initialRating = 0,
  filledColor = 'text-strong fill-strong',
  emptyColor = 'text-disabled fill-disabled',
  length = 5,
  onChange,
}: StarRatingInputProps) => {
  const [rating, setRating] = useState(initialRating)
  const [hoverRating, setHoverRating] = useState(0)

  const handleClick = (value: number) => {
    setRating(value)
    if (onChange) {
      onChange(value)
    }
  }

  const handleMouseEnter = (value: number) => {
    setHoverRating(value)
  }

  const handleMouseLeave = () => {
    setHoverRating(0)
  }

  const renderStars = () => {
    const stars = []
    const currentRating = hoverRating || rating

    for (let i = 1; i <= length; i++) {
      stars.push(
        <div
          key={i}
          onClick={() => handleClick(i)}
          onMouseEnter={() => handleMouseEnter(i)}
          onMouseLeave={handleMouseLeave}
          className="cursor-pointer"
        >
          <Star
            className={`size-9 ${
              i <= currentRating ? filledColor : emptyColor
            } transition-colors duration-150`}
          />
        </div>,
      )
    }

    return stars
  }

  return <div className="flex items-center">{renderStars()}</div>
}
