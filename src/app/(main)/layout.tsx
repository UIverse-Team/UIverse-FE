import React from 'react'
import Container from '@/components/layout/Container/Container'
import EventBanner from '@/components/banner/EventBanner'

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <EventBanner />
      <Container isBg={false} type="main">
        {children}
      </Container>
    </>
  )
}
