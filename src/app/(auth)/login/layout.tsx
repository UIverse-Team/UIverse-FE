import React from 'react'
import Container from '@/components/layout/Container/Container'

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container isBg={false} type="login">
      {children}
    </Container>
  )
}
