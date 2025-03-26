import * as React from 'react'
import { cn } from '@/libs/tailwindcss/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const dividerVariants = cva('w-full border-t', {
  variants: {
    weight: {
      xs: 'border-gray-100',
      sm: 'border-assist-line',
      md: 'border-alter-line',
      lg: 'border-line',
    },
  },
  defaultVariants: {
    weight: 'xs',
  },
})

const Divider = ({
  weight = 'xs',
  className,
}: React.HTMLAttributes<HTMLHRElement> & VariantProps<typeof dividerVariants>) => {
  return <hr className={cn(dividerVariants({ weight, className }))} />
}

export default Divider
