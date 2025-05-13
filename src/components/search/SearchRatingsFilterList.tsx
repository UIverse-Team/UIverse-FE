'use client'
import { useState, useEffect } from 'react'
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

  // Initialize selected ratings from URL on component mount
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    const ratingParams = params.getAll('ratings')

    if (ratingParams.length > 0) {
      const ratings = ratingParams.map((rating) => Number.parseInt(rating, 10))
      setSelectedRatings(ratings)
    }
  }, [searchParams])

  const handleRatingChecked = (rating: number) => {
    const newSelectedRatings = selectedRatings.includes(rating)
      ? selectedRatings.filter((r) => r !== rating)
      : [...selectedRatings, rating]

    setSelectedRatings(newSelectedRatings)

    const params = new URLSearchParams(searchParams.toString())

    // Remove all existing ratings parameters
    params.delete('ratings')

    // Add each selected rating as a separate ratings parameter
    newSelectedRatings.forEach((rating) => {
      params.append('ratings', rating.toString())
    })

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
