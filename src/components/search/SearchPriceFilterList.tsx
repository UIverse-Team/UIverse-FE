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
    const params = new URLSearchParams(searchParams.toString())

    const isAlreadySelected = selectedPriceMin.includes(min)

    if (isAlreadySelected) {
      setSelectedPriceMin(selectedPriceMin.filter((price) => price !== min))
    } else {
      setSelectedPriceMin([...selectedPriceMin, min])
    }

    if (selectedPriceMin) {
      params.set('price', String(selectedPriceMin))
    } else {
      params.delete('price')
    }

    router.push(`?${params.toString()}`)
  }

  return (
    <div>
      <AccordionContainer type="single" collapsible className="w-full">
        <AccordionItem value="category-header">
          <AccordionTrigger className="py-2 px-4 w-full typo-button1 h-[50px]">
            가격
          </AccordionTrigger>
          {priceFilter.map((value) => (
            <div className="flex gap-2 items-center" key={value.label}>
              <Checkbox size={'md'} onClick={() => handlePriceChecked(value.min)} />
              <span className="typo-caption1 text-alternative">{value.label}</span>
            </div>
          ))}
          <AccordionContent></AccordionContent>
        </AccordionItem>
      </AccordionContainer>
    </div>
  )
}

export default SearchPriceFilterList
