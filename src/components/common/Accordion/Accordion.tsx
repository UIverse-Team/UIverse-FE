import React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import ChevronDownIconfrom from 'public/icons/chevron-down.svg?svgr'

import { cn } from '@/libs/tailwindcss/utils'
import { AccordionData } from '@/types/realTimeKeyword/realTimeKeywordType'
import { RealTimeProductCard } from '@/components/keyword/RealTimeProductCard'
// import CardProduct from '../CardProduct/CardProduct'

function AccordionContainer({ ...props }: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn('border-alter-line', className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  children,
  title,
  className,
  rank,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger> & {
  title: string
  rank: number
}) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          'focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-center justify-between gap-4 rounded-md text-left transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180 py-6 px-8 duration-300 ease-in-out',
          className,
        )}
        {...props}
      >
        <div className="flex flex-col flex-1">
          <div className="flex gap-4 items-center">
            <span className="text-strong typo-h2">{rank}</span>
            <span className="text-strong typo-h2">{title}</span>
          </div>
          {children && <div className="mt-2 text-sm text-gray-500">{children}</div>}
        </div>
        <ChevronDownIconfrom />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down px-4"
      {...props}
    >
      <div className={cn('pt-0 pb-4', className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { AccordionContainer, AccordionItem, AccordionTrigger, AccordionContent }

interface AccordionItem {
  title: string
  content: string | React.ReactNode
  children?: React.ReactNode
}

interface CustomAccordionProps {
  items: AccordionData[]
  className?: string
  type?: 'single' | 'multiple'
}

const Accordion: React.FC<CustomAccordionProps> = ({ items, className = '', type = 'single' }) => {
  return (
    <AccordionContainer type={type} collapsible className={`w-full ${className}`}>
      {items.map((item, dateIndex) => (
        <AccordionItem
          key={`accordion-date-${dateIndex}`}
          value={`accordion-date-${dateIndex}`}
          className="flex flex-col gap-4"
        >
          {item.keywords.map((keyword, keywordIndex) => (
            <AccordionItem
              key={`keyword-${keywordIndex}`}
              value={`keyword-${keywordIndex}`}
              className="border-[1px] rounded-2xl"
            >
              <AccordionTrigger title={keyword.keyword} rank={keyword.rank} />
              <AccordionContent>
                <div className="flex gap-4">
                  {keyword.products.map((product) => (
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
          ))}
        </AccordionItem>
      ))}
    </AccordionContainer>
  )
}
export default Accordion
