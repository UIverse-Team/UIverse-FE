import * as React from 'react'
import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'
import * as LabelPrimitive from '@radix-ui/react-label'

const LabelVariants = cva('', {
  variants: {
    variant: {
      caption1: 'typo-caption1',
      button1: 'typo-button1',
      button2: 'typo-button2',
    },
  },
  defaultVariants: {
    variant: 'caption1',
  },
})

interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof LabelVariants> {}

function Label({ className, variant, ...props }: LabelProps) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(LabelVariants({ variant }), '', className)}
      {...props}
    />
  )
}

export { Label }
