'use client'

import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import ChevronDownIconfrom from 'public/icons/chevron-down.svg?svgr'

import { cn } from '@/lib/utils'

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
      className={cn('border-b last:border-b-0', className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  children,
  title,
  subTitle,
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger> & {
  title: string
  subTitle: string
}) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          'focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-center justify-between gap-4 rounded-md px-4 py-4 text-left transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180',
          className,
        )}
        {...props}
      >
        <div className="flex flex-col flex-1">
          <div className="flex gap-4 items-center">
            <span className="text-strong typo-h2">{title}</span>
            <span className="typo-body3 text-alternative">{subTitle}</span>
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
