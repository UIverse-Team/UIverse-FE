'use client'
import React, { useState } from 'react'
import Checkbox from '../common/Checkbox/Checkbox'
import {
  AccordionContainer,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../common/Accordion/Accordion'
import { useRouter, useSearchParams } from 'next/navigation'
import { StarRating } from '../common/rating/StarRating'

const SearchRatingsFilterList = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [selectedRatings, setSelectedRatings] = useState<number[]>([])

  const handleRatingChecked = (rating: number) => {
    const newSelectedRatings = selectedRatings.includes(rating)
      ? selectedRatings.filter((r) => r !== rating)
      : [...selectedRatings, rating]

    setSelectedRatings(newSelectedRatings)

    const params = new URLSearchParams(searchParams.toString())

    if (newSelectedRatings.length > 0) {
      params.set('ratings', newSelectedRatings.join(','))
    } else {
      params.delete('ratings')
    }

    router.push(`?${params.toString()}`)
  }

  const isRatingSelected = (rating: number) => {
    return selectedRatings.includes(rating)
  }

  return (
    <div className="flex flex-col gap-1">
      <AccordionContainer
        type="single"
        collapsible
        className="w-full"
        defaultValue="ratings-header" // This makes the accordion open by default
      >
        <AccordionItem value="ratings-header">
          <AccordionTrigger className="py-2 px-4 w-full typo-button1 h-[50px]">
            평점
          </AccordionTrigger>
          <AccordionContent>
            {Array.from({ length: 5 }, (_, i) => 5 - i).map((value) => (
              <div className="flex gap-2 items-center py-2 px-4" key={value}>
                <Checkbox
                  size={'md'}
                  onClick={() => handleRatingChecked(value)}
                  checked={isRatingSelected(value)}
                />
                <StarRating
                  rating={value}
                  size="sm"
                  showRatingValue={true}
                  filedColor="fill-warning"
                  textColor="text-white"
                  length={5}
                />
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </AccordionContainer>
    </div>
  )
}

export default SearchRatingsFilterList
