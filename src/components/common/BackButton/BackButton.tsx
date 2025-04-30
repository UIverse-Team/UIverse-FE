'use client'

import { ReactNode } from 'react'
import { useRouter } from 'next/navigation'

interface BackButtonProps {
  className?: string
  children: ReactNode
}

const BackButton = ({ className, children, ...props }: BackButtonProps) => {
  const router = useRouter()

  return (
    <button className={className} onClick={() => router.back()} {...props}>
      {children}
    </button>
  )
}

export default BackButton
