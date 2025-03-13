import * as React from 'react'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const helperLabelVariants = cva('typo-caption2', {
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
    <p data-slot="label" className={cn(helperLabelVariants({ variant }), className)} {...props}>
      <span>{children}</span>
    </p>
  )
}

export { HelperLabel }
