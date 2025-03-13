import * as React from 'react'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const helperLabelVariants = cva('', {
  variants: {
    variant: {
      error: 'text-error',
      success: 'text-success',
      default: 'text-alternative',
    },
    size: {
      default: 'typo-caption2',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

interface HelperLabelProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof helperLabelVariants> {}

const HelperLabel = ({ className, variant, children, ...props }: HelperLabelProps) => {
  return (
    <p
      data-slot="label"
      className={cn(helperLabelVariants({ variant }), 'flex gap-1', className)}
      {...props}
    >
      <span>{children}</span>
    </p>
  )
}

export { HelperLabel }
