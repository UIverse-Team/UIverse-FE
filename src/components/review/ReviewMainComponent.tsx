'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { ReviewArray } from '@/types/review/reviewType'
import Chip from '../common/Chip/Chip'
import Chat from 'public/icons/chat.svg'
import { ReviewCard } from './ReviewCard'

interface ReviewMainProps {
  review: ReviewArray
}

export const ReviewMainComponent = ({ review }: ReviewMainProps) => {
  const categories = [...new Set(review.map((item) => item.category))]

  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    categories.length > 0 ? categories[0] : '',
  )

  const filteredReviews = selectedCategory
    ? review.find((item) => item.category === selectedCategory)?.content || []
    : review.flatMap((item) => item.content)

  return (
    <div className="py-20 flex justify-center items-center w-full">
      <div className="flex flex-col gap-4  py-4 w-full">
        <div className="flex flex-col items-center gap-2">
          <Image src={Chat} width={36} height={36} alt="오늘의 특가 로고" />
          <h3 className="typo-h2">후기가 알려주는 진짜 인기템</h3>
          <span className="typo-body3 text-assistive">
            실제 후기를 보고 고른, 믿고 쓰는 베스트템이에요
          </span>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 justify-center">
            {categories.map((category) => (
              <Chip
                key={category}
                variant="secondary"
                size="md"
                selected={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Chip>
            ))}
          </div>
          <div className="flex flex-wrap gap-4 justify-around">
            {filteredReviews.map((item, index) => (
              <ReviewCard item={item} key={index + item.tag} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
