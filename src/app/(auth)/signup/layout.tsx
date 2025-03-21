import React from 'react'
import Container from '@/components/layout/Container/Container'

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container isBg={false} type="signup">
      {children}
    </Container>
  )
}
