'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import DeleteIcon from '/public/icons/delete.svg?svgr'

const chipVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-[50px] transition-colors cursor-pointer',
  {
    variants: {
      variant: {
        primary: '',
        secondary: '',
        tertiary: '',
      },
      size: {
        sm: 'px-2.5 py-1 typo-caption1',
        md: 'px-3.5 py-1.5 typo-body3',
        lg: 'px-4.5 py-2 typo-body1',
      },
      selected: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      // Primary variant
      {
        variant: 'primary',
        selected: false,
        className: 'bg-primary-a8 text-primary',
      },
      {
        variant: 'primary',
        selected: true,
        className: 'bg-primary text-white',
      },
      // Secondary variant
      {
        variant: 'secondary',
        selected: false,
        className: 'bg-neutral text-strong',
      },
      {
        variant: 'secondary',
        selected: true,
        className: 'bg-secondary text-white',
      },
      // Tertiary variant
      {
        variant: 'tertiary',
        selected: false,
        className: 'bg-white text-assistive border border-alter-line',
      },
      {
        variant: 'tertiary',
        selected: true,
        className: 'bg-primary-a8 text-primary border border-primary',
      },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      selected: false,
    },
  },
)

interface ChipProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chipVariants> {
  disclosure?: boolean
  onClose?: () => void
}

const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  (
    { className, variant, size, selected, disclosure = false, onClose, children, ...props },
    ref,
  ) => {
    return (
      <div
        className={cn(chipVariants({ variant, size, selected, className }))}
        ref={ref}
        {...props}
      >
        {children}
        {disclosure && (
          <button
            type="button"
            className={cn(
              'outline-none size-5 p-0.75 ml-0.5',
              size === 'lg' ? 'size-6 p-1 ml-1' : 'size-4 p-0.5',
            )}
            onClick={(e) => {
              e.stopPropagation()
              onClose?.()
            }}
            aria-label="Close"
          >
            <DeleteIcon
              className={cn(
                '',
                variant === 'primary' && selected ? 'text-white' : '',
                variant === 'secondary' && selected ? 'text-white' : '',
                variant === 'tertiary' && selected ? 'text-primary' : '',
                variant === 'primary' && !selected ? 'text-primary' : '',
                variant === 'secondary' && !selected ? 'text-alternative' : '',
                variant === 'tertiary' && !selected ? 'text-alternative' : '',
              )}
            />
          </button>
        )}
      </div>
    )
  },
)
Chip.displayName = 'Chip'

export default Chip
