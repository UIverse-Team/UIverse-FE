import React from 'react'
import Container from '@/components/layout/Container/Container'

export default function FindPwLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container isBg={false} type="signup">
      {children}
    </Container>
  )
}
