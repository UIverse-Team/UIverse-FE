'use client'

import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import CheckIcon from '/public/check.svg'
import { Label } from '../Label/Label'

interface CheckLabel {
  label?: string
  labelPosition?: 'left' | 'right'
}

const checkboxVariants = cva(
  'shrink-0 rounded-[3px] border border-line focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-disabled-fill disabled:border-none',
  {
    variants: {
      variant: {
        primary: 'data-[state=checked]:border-0 data-[state=checked]:bg-primary',
        secondary: 'data-[state=checked]:border-0 data-[state=checked]:bg-secondary',
      },
      size: {
        md: 'h-4.5 w-4.5',
        lg: 'h-6 w-6',
      },
    },
    defaultVariants: {
      variant: 'secondary',
      size: 'md',
    },
  },
)

const LabelSizeMap = {
  md: 'text-assistive group-has-data-[state=checked]:text-secondary',
  lg: 'text-normal group-has-data-[state=checked]:typo-button2 group-has-data-[state=checked]:text-secondary',
}

function Checkbox({
  className,
  variant,
  size = 'md',
  label,
  labelPosition = 'right',
  ...props
}: React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> &
  VariantProps<typeof checkboxVariants> &
  CheckLabel) {
  return (
    <div className="group flex items-center gap-2">
      {label && labelPosition === 'left' && (
        <Label
          htmlFor={props.id}
          className={`${LabelSizeMap[size!]} group-has-data-[disabled]:text-disabled cursor-pointer group-has-data-[disabled]:cursor-not-allowed`}
        >
          {label}
        </Label>
      )}
      <CheckboxPrimitive.Root
        data-slot="checkbox"
        className={cn(checkboxVariants({ variant, size, className }))}
        {...props}
      >
        <CheckboxPrimitive.Indicator
          data-slot="checkbox-indicator"
          className="flex items-center justify-center text-current transition-none"
        >
          <CheckIcon className={`text-white ${size === 'md' ? 'size-4' : 'size-5'}`} />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {label && labelPosition === 'right' && (
        <Label
          htmlFor={props.id}
          className={`${LabelSizeMap[size!]} group-has-data-[disabled]:text-disabled cursor-pointer group-has-data-[disabled]:cursor-not-allowed`}
        >
          {label}
        </Label>
      )}
    </div>
  )
}

export default Checkbox
