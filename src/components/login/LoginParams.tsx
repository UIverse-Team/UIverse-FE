'use client'
import { useSearchParams } from 'next/navigation'
import TextButton from '@/components/common/Button/TextButton'

interface LoginPageParamsProps {
  handlePopularPage: () => void
}

export function LoginPageParams({ handlePopularPage }: LoginPageParamsProps) {
  const searchParams = useSearchParams()
  const pathname = searchParams.get('guest')

  if (pathname !== 'guestOrder') {
    return null
  }

  return (
    <TextButton
      iconPosition="right"
      className="py-3 typo-button1 text-assistive flex"
      onClick={handlePopularPage}
    >
      비회원 주문하기
    </TextButton>
  )
}
