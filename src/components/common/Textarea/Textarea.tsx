import * as React from 'react'
import { cn } from '@/libs/tailwindcss/utils'
import { cva, VariantProps } from 'class-variance-authority'

const TextareaVariants = cva(
  'typo-body3 border p-4 rounded-sm outline-none placeholder-assistive text-strong resize-none custom-scrollbar',
  {
    variants: {
      variant: {
        default: 'border-assist-line',
        focused: 'border-secondary',
        error: 'border-error',
        disabled: 'border-assist-line bg-disabled-fill cursor-not-allowed text-disabled',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof TextareaVariants> {
  error?: boolean
}

const Textarea = ({ className, variant, disabled, error, ...props }: TextareaProps) => {
  const [isFocused, setIsFocused] = React.useState(false)

  let currentState = variant
  if (disabled) {
    currentState = 'disabled'
  } else if (isFocused) {
    currentState = 'focused'
  } else if (error) {
    currentState = 'error'
  }
  return (
    <textarea
      data-slot="textarea"
      className={cn(TextareaVariants({ variant: currentState }), '', className)}
      disabled={disabled}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      {...props}
    />
  )
}

export { Textarea }
