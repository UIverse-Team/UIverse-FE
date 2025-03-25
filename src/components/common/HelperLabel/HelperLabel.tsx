import * as React from 'react'
import { cn } from '@/libs/tailwindcss/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const helperLabelVariants = cva('typo-caption2 flex gap-0.5 items-center', {
  variants: {
    variant: {
      error: 'text-error',
      success: 'text-success',
      default: 'text-alternative',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

interface HelperLabelProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof helperLabelVariants> {}

const HelperLabel = ({ className, variant, children, ...props }: HelperLabelProps) => {
  return (
    <p className={cn(helperLabelVariants({ variant }), className)} {...props}>
      {children}
    </p>
  )
}

export { HelperLabel }
