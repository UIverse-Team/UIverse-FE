'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/libs/tailwindcss/utils'

const TagVariants = cva(
  'inline-flex items-center  justify-center whitespace-nowrap rounded-sm transition-colors',
  {
    variants: {
      variant: {
        primary1: '',
        primary2: '',
        secondary: '',
        tertiary: '',
        sale: '',
        safe: '',
      },
      size: {
        sm: 'px-1 py-0.5 typo-caption2',
        md: 'px-1.5 py-1 typo-body3',
      },
    },
    compoundVariants: [
      {
        variant: 'primary1',
        className: 'bg-primary-a8 text-primary',
      },
      {
        variant: 'primary2',
        className: 'bg-primary text-white',
      },
      {
        variant: 'secondary',
        className: 'bg-neutral text-strong',
      },
      {
        variant: 'tertiary',
        className: 'text-strong bg-neutral',
      },
      {
        variant: 'sale',
        className: 'bg-sale text-white',
      },
      {
        variant: 'safe',
        className: 'bg-positive text-white',
      },
    ],
    defaultVariants: {
      variant: 'primary1',
      size: 'md',
    },
  },
)

interface ChipProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof TagVariants> {
  disclosure?: boolean
  onClose?: () => void
}

const Tag = React.forwardRef<HTMLDivElement, ChipProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <div className={cn(TagVariants({ variant, size, className }))} ref={ref} {...props}>
        {children}
      </div>
    )
  },
)
Tag.displayName = 'Tag'

export default Tag
