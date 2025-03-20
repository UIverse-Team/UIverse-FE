'use client'

import { ComponentProps } from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Label } from '../Label/Label'

const radioVariants = cva(
  'peer border-assist-line text-strong aspect-square shrink-0 rounded-full border transition-[color] outline-none data-[state=checked]:border-0 data-[state=checked]:bg-primary disabled:cursor-not-allowed disabled:border-gray-50',
  {
    variants: {
      size: {
        md: 'size-4.5 border-2',
        lg: 'size-6 border-3',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

function RadioGroupItem({
  className,
  size = 'md',
  label,
  ...props
}: ComponentProps<typeof RadioGroupPrimitive.Item> &
  VariantProps<typeof radioVariants> & { label?: string }) {
  return (
    <div className={`flex items-center ${size === 'md' ? 'gap-2' : 'gap-3'}`}>
      <RadioGroupPrimitive.Item
        data-slot="radio-group-item"
        className={cn(radioVariants({ size, className }))}
        {...props}
      >
        <RadioGroupPrimitive.Indicator
          data-slot="radio-group-indicator"
          className="relative flex items-center justify-center"
        >
          <div
            className={`bg-white rounded-full ${size === 'md' ? 'size-2' : 'size-2.5'} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
          ></div>
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
      <Label
        htmlFor={props.id}
        className={`${size === 'md' ? 'caption1' : 'button1'} peer-disabled:text-disabled peer-disabled:cursor-not-allowed`}
      >
        {label}
      </Label>
    </div>
  )
}

export default RadioGroupItem
