import Button from '@/components/common/Button/Button'
import { Input } from '@/components/common/Input/Input'
import { useRouter } from 'next/navigation'
import { ChangeEvent, KeyboardEvent, useState } from 'react'

export const GuestOrderCheck = () => {
  const router = useRouter()

  const [phone, setPhone] = useState('')
  const [, setRawPhone] = useState('')
  const [order, setOrder] = useState('')

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '')
    setRawPhone(value)

    if (value.length < 4) {
      setPhone(value)
    } else if (value.length < 7) {
      setPhone(`${value.slice(0, 3)}-${value.slice(3)}`)
    } else if (value.length <= 11) {
      setPhone(`${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7)}`)
    } else {
      setPhone(`${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7, 11)}`)
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && phone.endsWith('-')) {
      e.preventDefault()
      setPhone((prev) => prev.slice(0, -1))
      setRawPhone((prev) => prev.slice(0, -1))
    }
  }

  const handleOrderChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^A-Z0-9]/g, '').slice(0, 16)
    setOrder(value)
  }

  return (
    <>
      <div className="pt-4 pb-2">
        <div className="h-[75px]">
          <Input
            variant="auth"
            onChange={handlePhoneChange}
            value={phone}
            onKeyDown={handleKeyDown}
            placeholder="휴대폰 번호"
          />
        </div>
        <Input variant="auth" onChange={handleOrderChange} value={order} placeholder="주문번호" />
      </div>
      <div className="mt-14">
        <Button className="mb-2">주문내역 조회</Button>
        <Button onClick={() => router.push('/signup')} variant="outline">
          회원가입
        </Button>
      </div>
    </>
  )
}
