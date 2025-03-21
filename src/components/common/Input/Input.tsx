import { useState, ReactNode, InputHTMLAttributes, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'
import EyeIcon from '/public/icons/eye.svg?svgr'
import EyeClosedIcon from '/public/icons/eye-closed.svg?svgr'
import { Timer } from './Timer'
import IconButton from '../Button/IconButton'

const InputWrapperVariants = cva('flex items-center', {
  variants: {
    variant: {
      default: 'border rounded-sm border-assist-line focus-within:border-secondary',
      error: 'border rounded-sm border-error',
      disabled: 'border rounded-sm border-assist-line bg-gray-75',
      auth: 'border-b border-assist-line focus-within:border-secondary',
      authDisabled: 'border-b border-assist-line',
      authError: 'border-b border-error focus-within:border-secondary',
      timer: 'border-b border-assist-line focus-within:border-secondary',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

const InputVariants = cva(
  'typo-body3 p-4 outline-none placeholder-assistive text-strong flex-grow',
  {
    variants: {
      variant: {
        default: 'border-0',
        error: 'border-0',
        disabled: 'border-0 cursor-not-allowed text-disabled',
        auth: 'border-0',
        authDisabled: 'border-0 cursor-not-allowed text-disabled',
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
  onTimerExpired?: () => void
}

const Input = ({
  className,
  variant,
  type,
  disabled: externalDisabled,
  error,
  children,
  showTimer = false,
  duration = 300,
  onTimerExpired,
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const [count, setCount] = useState(duration)
  const [isTimerExpired, setIsTimerExpired] = useState(false)

  // 타이머 만료 상태와 외부에서 전달된 disabled 상태를 결합
  const disabled = externalDisabled || (showTimer && isTimerExpired)

  // count가 변경될 때마다 체크하여 타이머 만료 여부 확인
  useEffect(() => {
    if (count === 0 && showTimer && !isTimerExpired) {
      setIsTimerExpired(true)
      onTimerExpired?.() // 타이머 만료 콜백 호출 (필요시)
    }
  }, [count, showTimer, isTimerExpired, onTimerExpired])

  // showTimer 또는 duration이 변경될 때 타이머 상태 초기화
  useEffect(() => {
    if (showTimer) {
      setCount(duration)
      setIsTimerExpired(false)
    }
  }, [showTimer, duration])

  let currentState = variant
  if (disabled) {
    currentState = currentState === 'auth' ? 'authDisabled' : 'disabled'
  } else if (error) {
    currentState = currentState === 'auth' ? 'authError' : 'error'
  } else if (showTimer) {
    currentState = 'timer'
  }

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
        autoComplete="off"
        {...props}
      />

      {type === 'password' ? (
        <IconButton
          className="pr-4 text-assistive hover:text-strong focus:outline-none"
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
