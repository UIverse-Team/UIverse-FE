import React from 'react'
import Container from '@/components/layout/Container/Container'

export default function MypageLayout({ children }: { children: React.ReactNode }) {
  return <Container type="mypage">{children}</Container>
}
