'use client'

import React from 'react'
import { useTheme } from 'next-themes'
import { toast as sonnerToast, Toaster as Sonner, ToasterProps } from 'sonner'

// Toast type definitions
type ToastType = 'default' | 'error' | 'success' | 'info'

// Images for different toast types (you'll need to replace these with actual image paths)
const TOAST_IMAGES: Record<ToastType, string> = {
  default: '/icons/default-icon.svg',
  error: '/icons/error-icon.svg',
  success: '/icons/success-icon.svg',
  info: '/icons/info-icon.svg',
}

// Toast color configurations
const TOAST_COLORS: Record<ToastType, { background: string; text: string }> = {
  default: { background: 'bg-black', text: 'text-white' },
  error: { background: 'bg-red-500', text: 'text-white' },
  success: { background: 'bg-green-500', text: 'text-white' },
  info: { background: 'bg-blue-500', text: 'text-white' },
}

// Toast options interface
interface CustomToastOptions {
  type?: ToastType
  content: string
  duration?: number
}

// Custom toast function
const toast = ({ type = 'default', content, duration = 3000 }: CustomToastOptions) => {
  sonnerToast.custom(
    (t) => (
      <div
        className={`
        flex items-center p-4 rounded-lg space-x-4 
        ${TOAST_COLORS[type].background} 
        ${TOAST_COLORS[type].text}
      `}
      >
        {/* Fixed image for non-default types */}
        {type !== 'default' && (
          <img src={TOAST_IMAGES[type]} alt={`${type} icon`} className="w-6 h-6" />
        )}

        {/* Content */}
        <div className="flex-grow">{content}</div>

        {/* Close button */}
        <button onClick={() => sonnerToast.dismiss(t)} className="ml-2 hover:opacity-75">
          ✕
        </button>
      </div>
    ),
    {
      duration,
      className: 'custom-toast',
    },
  )
}

// Toaster component
const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()

  return <Sonner theme={theme as ToasterProps['theme']} className="toaster group" {...props} />
}

// Export toast and Toaster
export { toast, Toaster }
