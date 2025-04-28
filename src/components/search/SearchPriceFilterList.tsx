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
import { priceFilter } from '@/util/priceFilter'

const SearchPriceFilterList = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [selectedPriceMin, setSelectedPriceMin] = useState<number[]>([])

  const handlePriceChecked = (min: number) => {
    const newSelectedPrices = selectedPriceMin.includes(min)
      ? selectedPriceMin.filter((price) => price !== min)
      : [...selectedPriceMin, min]

    setSelectedPriceMin(newSelectedPrices)

    const params = new URLSearchParams(searchParams.toString())

    if (newSelectedPrices.length > 0) {
      params.set('price', newSelectedPrices.join(','))
    } else {
      params.delete('price')
    }

    router.push(`?${params.toString()}`)
  }

  const isPriceSelected = (min: number) => {
    return selectedPriceMin.includes(min)
  }

  return (
    <div className="flex flex-col gap-1">
      <AccordionContainer type="single" collapsible className="w-full" defaultValue="price-header">
        <AccordionItem value="price-header">
          <AccordionTrigger className="py-2 px-4 w-full typo-button1 h-[50px]">
            가격
          </AccordionTrigger>
          <AccordionContent>
            {priceFilter.map((value) => (
              <div className="flex gap-2 items-center py-2 px-4" key={value.label}>
                <Checkbox
                  size={'md'}
                  onClick={() => handlePriceChecked(value.min)}
                  checked={isPriceSelected(value.min)}
                />
                <span className="typo-caption1 text-alternative">{value.label}</span>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </AccordionContainer>
    </div>
  )
}

export default SearchPriceFilterList
