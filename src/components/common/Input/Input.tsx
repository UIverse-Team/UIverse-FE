import { useState, ReactNode, InputHTMLAttributes, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'
import EyeIcon from '/public/eye.svg'
import EyeClosedIcon from '/public/eyeclosed.svg'
import { IconButton } from '../IconButton/IconButton'
import { Timer } from './Timer'

const InputWrapperVariants = cva('flex items-center', {
  variants: {
    variant: {
      default: 'border rounded-sm border-assist-line focus-within:border-secondary',
      error: 'border rounded-sm border-error',
      disabled: 'border rounded-sm border-assist-line bg-gray-75',
      auth: 'border-b border-assist-line focus-within:border-secondary',
      authError: 'border-b border-error focus-within:border-secondary',
      timer: 'border-b border-assist-line focus-within:border-secondary',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

const InputVariants = cva(
  'typo-body3 p-4 outline-none placeholder-assistive text-secondary flex-grow',
  {
    variants: {
      variant: {
        default: 'border-0',
        error: 'border-0',
        disabled: 'border-0 cursor-not-allowed text-disabled',
        auth: 'border-0',
        authError: 'border-0',
        timer: 'border-0',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof InputVariants> {
  error?: boolean
  children?: ReactNode
  showTimer?: boolean
  duration?: number
}

const Input = ({
  className,
  variant,
  type,
  disabled,
  error,
  children,
  showTimer = false,
  duration = 300, // 기본값 5분
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const [count, setCount] = useState(duration)

  let currentState = variant
  if (disabled) {
    currentState = 'disabled'
  } else if (error) {
    if (currentState === 'auth') {
      currentState = 'authError'
    } else {
      currentState = 'error'
    }
  } else if (showTimer) {
    currentState = 'timer'
  }

  useEffect(() => {
    if (showTimer) {
      setCount(duration)
    }
  }, [showTimer, duration])

  const inputType = type === 'password' && showPassword ? 'text' : type

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev)
  }

  return (
    <div className={cn(InputWrapperVariants({ variant: currentState }), className)}>
      <input
        type={inputType}
        data-slot="input"
        className={cn(InputVariants({ variant: currentState }), className)}
        disabled={disabled}
        {...props}
      />
      {type === 'password' ? (
        <IconButton
          className="pr-4 text-assistive hover:text-secondary focus:outline-none"
          onClick={handleTogglePassword}
        >
          {showPassword ? (
            <EyeIcon className="w-6 h-6 text-assistive" />
          ) : (
            <EyeClosedIcon className="w-6 h-6 text-assistive" />
          )}
        </IconButton>
      ) : showTimer ? (
        <div className="typo-caption1 text-error">
          <Timer count={count} setCount={setCount} />
        </div>
      ) : (
        children
      )}
    </div>
  )
}

export { Input }
