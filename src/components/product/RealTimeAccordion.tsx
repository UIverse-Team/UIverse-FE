import React from 'react'
import { RealTimeKeyword } from '@/types/realTimeKeyword/realTimeKeywordType'
import { RealTimeProductCard } from '@/components/keyword/RealTimeProductCard'
import {
  AccordionContainer,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../common/Accordion/Accordion'

interface RealTimeAccordionProps {
  items: RealTimeKeyword
  className?: string
  type?: 'single' | 'multiple'
}

const RealTimeAccordion = ({ items, className = '', type = 'single' }: RealTimeAccordionProps) => {
  return (
    <AccordionContainer type={type} collapsible className={`w-full ${className}`}>
      <AccordionItem
        key={`keyword-${items.rank}`}
        value={`keyword-${items.keyword}`}
        className="border-[1px] rounded-2xl border-alter-line"
      >
        <AccordionTrigger className="py-6 px-8">
          <div className="flex flex-col flex-1">
            <div className="flex gap-4 items-center">
              <span className="text-strong typo-h2">{items.rank}</span>
              <span className="text-strong typo-h2">{items.keyword}</span>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="-mt-2 pb-6">
          <div className="flex gap-4 px-4 pb-4">
            {items.products.map((product) => (
              <div key={product.productId}>
                <RealTimeProductCard
                  productImageUrl={product.productImageUrl}
                  brand={product.brand}
                  name={product.name}
                  originPrice={product.originPrice}
                  discountPrice={product.discountPrice}
                  discountRate={product.discountRate}
                  salesVolume={product.salesVolume}
                  reviewRating={product.reviewRating}
                  productId={product.productId}
                />
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </AccordionContainer>
  )
}
export default RealTimeAccordion
