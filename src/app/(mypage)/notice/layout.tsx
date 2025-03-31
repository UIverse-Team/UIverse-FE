import React from 'react'
import Container from '@/components/layout/Container/Container'

export default function NoticeLayout({ children }: { children: React.ReactNode }) {
  return <Container type="mypage">{children}</Container>
}
