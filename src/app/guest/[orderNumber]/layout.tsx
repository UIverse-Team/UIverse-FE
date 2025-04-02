import React from 'react'
import Container from '@/components/layout/Container/Container'

export default function QuestOrderLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <div className="px-27">{children}</div>
    </Container>
  )
}
