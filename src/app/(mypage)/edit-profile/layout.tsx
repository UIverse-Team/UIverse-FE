import React from 'react'
import Container from '@/components/layout/Container/Container'

export default function EditProfileLayout({ children }: { children: React.ReactNode }) {
  return <Container type="mypage">{children}</Container>
}
