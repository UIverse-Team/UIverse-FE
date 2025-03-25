import React from 'react'
import Container from '@/components/layout/Container/Container'

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return <Container isBg={false}>{children}</Container>
}
