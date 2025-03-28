import React from 'react'
import Container from '@/components/layout/Container/Container'

export default function CustomLayout({ children }: { children: React.ReactNode }) {
  return <Container>{children}</Container>
}
