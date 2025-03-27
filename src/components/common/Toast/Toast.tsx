'use client'

import React from 'react'
import { useTheme } from 'next-themes'
import { toast as sonnerToast, Toaster as Sonner, ToasterProps } from 'sonner'
import InfoCircle from '/public/icons/info-circle.svg?svgr'

// Explicitly define Position type since it's not exported
type Position =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'top-center'
  | 'bottom-center'

// Toast type definitions
type ToastType = 'default' | 'error' | 'success' | 'info'

// Toast color configurations
const TOAST_COLORS: Record<ToastType, { background: string; text: string }> = {
  default: { background: 'bg-secondary', text: 'text-white typo-body3' },
  error: { background: 'bg-sale', text: 'text-white typo-body3' },
  success: { background: 'bg-success', text: 'text-white typo-body3' },
  info: { background: 'bg-secondary', text: 'text-white typo-body3' },
}

// Toast options interface
interface CustomToastOptions {
  type?: ToastType
  content: string
  duration?: number
  position?: Position
}

// Custom toast function
const toast = ({ type = 'default', content, duration = 3000, position }: CustomToastOptions) => {
  sonnerToast.custom(
    () => (
      <div
        className={`
        flex items-center pr-4 pl-4.5 py-3.5 rounded-sm gap-2 
        
        ${TOAST_COLORS[type].background} 
        ${TOAST_COLORS[type].text}
      `}
      >
        {/* Fixed image for non-default types */}
        {type !== 'default' && <InfoCircle className="size-4 " />}

        {/* Content */}
        <div className="flex-grow typo-body3">{content}</div>
      </div>
    ),
    {
      duration,
      className: 'custom-toast',
      position,
    },
  )
}

// Extended ToasterProps interface to ensure position is properly typed
interface CustomToasterProps extends ToasterProps {
  position?: Position
}

// Toaster component
const Toaster = ({ position = 'bottom-right', ...props }: CustomToasterProps) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      position={position}
      {...props}
    />
  )
}

// Export toast and Toaster
export { toast, Toaster }
