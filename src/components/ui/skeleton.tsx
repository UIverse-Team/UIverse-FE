import { cn } from '@/libs/tailwindcss/utils'
import React from 'react'

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      className={cn('bg-gray-75 animate-pulse rounded-md', className)}
      {...props}
    />
  )
}

export { Skeleton }
