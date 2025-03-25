import React from 'react'
import {
  AccordionContainer,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

interface AccordionItem {
  title: string
  subTitle: string
  content: string | React.ReactNode
  children?: React.ReactNode
}

interface CustomAccordionProps {
  items: AccordionItem[]
  className?: string
  type?: 'single' | 'multiple'
}

const Accordion: React.FC<CustomAccordionProps> = ({ items, className = '', type = 'single' }) => {
  return (
    <AccordionContainer type={type} collapsible className={`w-full ${className} `}>
      {items.map((item, index) => (
        <AccordionItem
          key={`accordion-item-${index}`}
          value={`accordion-item-${index}`}
          className="flex flex-col gap-2  border border-primary px-8 py-6"
        >
          <AccordionTrigger title={item.title} subTitle={item.subTitle}>
            {item.children}
          </AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </AccordionContainer>
  )
}

export default Accordion
