import * as React from 'react'
import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'

const InputVariants = cva(
  'typo-body3 border p-4 rounded-sm outline-none placeholder-assistive text-secondary',
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

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof InputVariants> {
  error?: boolean
}

const Input = ({ className, variant, type, disabled, error, ...props }: InputProps) => {
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
    <input
      type={type}
      data-slot="input"
      className={cn(InputVariants({ variant: currentState }), '', className)}
      disabled={disabled}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      {...props}
    />
  )
}

export { Input }
