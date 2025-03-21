import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'w-full inline-flex items-center justify-center whitespace-nowrap transition-colors disabled:pointer-events-none outline-none cursor-pointer',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-white hover:bg-primary-hover disabled:bg-disabled-fill disabled:text-assistive',
        secondary:
          'bg-secondary text-white hover:bg-secondary-hover disabled:bg-disabled-fill disabled:text-assistive',
        tertiary:
          'bg-tertiary text-strong hover:bg-tertiary-hover disabled:bg-disabled-fill disabled:text-assistive',
        outline:
          'bg-white text-strong border border-secondary hover:bg-outline-hover hover:text-white disabled:border-alter-line disabled:text-disabled',
      },
      size: {
        sm: 'p-2 typo-caption2 rounded-sm gap-0.5',
        md: 'px-3.5 py-3 typo-button1 rounded-md gap-1.5',
        lg: 'px-4 py-3.5 typo-h3 rounded-md gap-1.5',
      },
    },
    defaultVariants: {
      variant: 'secondary',
      size: 'lg',
    },
  },
)

const Button = ({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) => {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export default Button
