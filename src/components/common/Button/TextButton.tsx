import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/libs/tailwindcss/utils'
import LeftArrowIcon from '/public/icons/left-arrow.svg?svgr'
import RightArrowIcon from '/public/icons/right-arrow.svg?svgr'

// 아이콘 위치 타입 정의
type IconPosition = 'left' | 'right'

type TextButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof textButtonVariants> & {
    iconPosition?: IconPosition
    asChild?: boolean
  }

const textButtonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap disabled:pointer-events-none outline-none cursor-pointer',
  {
    variants: {
      size: {
        xs: 'typo-caption2 gap-0.5',
        sm: 'typo-caption1 gap-1',
        md: 'typo-body3 gap-1',
        lg: 'typo-body2 gap-2',
        xl: 'typo-h3 gap-2',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

// 버튼 size prop에 따른 아이콘 크기 Mapping
const IconSizeMap = {
  xs: 'w-2.5 h-2.5',
  sm: 'w-3 h-3',
  md: 'w-4.5 h-4.5',
  lg: 'w-4.5 h-4.5',
  xl: 'w-6 h-6',
}

const TextButton = ({
  className,
  size = 'md',
  iconPosition,
  asChild = false,
  children,
  ...props
}: TextButtonProps) => {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp data-slot="button" className={cn(textButtonVariants({ size, className }))} {...props}>
      {iconPosition === 'left' && <LeftArrowIcon className={`${IconSizeMap[size!]} text-normal`} />}
      {children}
      {iconPosition === 'right' && (
        <RightArrowIcon className={`${IconSizeMap[size!]} text-normal`} />
      )}
    </Comp>
  )
}

export default TextButton
