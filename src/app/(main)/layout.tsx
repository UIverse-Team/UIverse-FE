import React from 'react'
import Container from '@/components/layout/Container/Container'

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  return <Container isBg={false}>{children}</Container>
}
