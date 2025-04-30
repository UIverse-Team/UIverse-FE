import React from 'react'
import Container from '@/components/layout/Container/Container'

export default function ReviewRegisterLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed top-0 left-0 z-100 bg-neutral w-full h-full overflow-y-auto">
      <Container>{children}</Container>
    </div>
  )
}
