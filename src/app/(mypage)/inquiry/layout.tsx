import React from 'react'
import Container from '@/components/layout/Container/Container'

export default function InquiryLayout({ children }: { children: React.ReactNode }) {
  return <Container type="mypage">{children}</Container>
}
