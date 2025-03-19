import Button from '@/components/common/Button/Button'
import { HelperLabel } from '@/components/common/HelperLabel/HelperLabel'
import { Input } from '@/components/common/Input/Input'
import { Label } from '@/components/common/Label/Label'
import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'

export const UserInfoForm = () => {
  const [isCurrentStepValid] = useState(true)
  const [name, setName] = useState('')
  const [birth, setBirth] = useState('')
  const [gender, setGender] = useState('')
  const [phone, setPhone] = useState('')
  const [rawPhone, setRawPhone] = useState('')
  const [code, setCode] = useState('')
  const [buttonMessage, setButtonMessage] = useState('인증번호 전송')
  const [isBtnOn, setIsBtnOn] = useState(false)
  const [isTimerOn, setIsTimerOn] = useState(false)
  const [codeHelper] = useState('인증번호가 일치하지 않습니다.')

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setName(value)
  }

  const handleBirthChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6)
    setBirth(value)
  }

  const handleGenderChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 1)
    setGender(value)
  }

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

  useEffect(() => {
    if (isValidPhoneNumber(phone)) {
      setIsBtnOn(true)
    } else {
      setIsBtnOn(false)
    }
  }, [phone])

  const isValidPhoneNumber = (phone: string) => {
    const regex = /^01[016789]-?\d{3,4}-?\d{4}$/
    return regex.test(phone)
  }

  const handleCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6)
    setCode(value)
  }

  const onClickPhoneVerifyBtn = () => {
    console.log(rawPhone)
    setButtonMessage('인증번호 재전송')
    setIsTimerOn(false)
    setTimeout(() => {
      setIsTimerOn(true)
    }, 0)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && phone.endsWith('-')) {
      e.preventDefault() // 기본 동작 방지
      setPhone((prev) => prev.slice(0, -1)) // 하이픈 삭제
      setRawPhone((prev) => prev.slice(0, -1)) // raw 데이터도 동기화
    }
  }

  const onClickSignUpBtn = () => {
    console.log('가입완료')
  }
  return (
    <>
      <div className="pb-5">
        <div className="w-full flex items-center justify-between">
          <Label htmlFor="name">이름</Label>
          <Input
            id="name"
            variant="auth"
            placeholder="이름"
            value={name}
            onChange={handleNameChange}
            className="w-[338px]"
          />
        </div>
      </div>
      <div className="pb-5">
        <div className="w-full flex items-center justify-between">
          <Label htmlFor="birth">생년월일/성별</Label>
          <div className="flex gap-2 items-center">
            <Input
              id="birth"
              variant="auth"
              placeholder="YYMMDD"
              value={birth}
              onChange={handleBirthChange}
              className="w-[140px]"
            />
            <p className="typo-body3 text-assistive">-</p>
            <Input
              id="gender"
              variant="auth"
              value={gender}
              onChange={handleGenderChange}
              className="w-6 p-1"
            />
            <p className="typo-body3 text-assistive w-[135px] p-2.5">******</p>
          </div>
        </div>
      </div>
      <div className="pb-5">
        <div className="w-full flex items-center justify-between">
          <Label htmlFor="phone">휴대폰번호</Label>
          <Input
            id="phone"
            variant="auth"
            placeholder="휴대폰번호"
            value={phone}
            onChange={handlePhoneChange}
            onKeyDown={handleKeyDown}
            className="w-[338px]"
          >
            <Button
              variant="outline"
              size="sm"
              className={
                isBtnOn ? 'border-secondary text-secondary' : 'border-assist-line text-assistive'
              }
              disabled={!isBtnOn}
              onClick={onClickPhoneVerifyBtn}
            >
              {buttonMessage}
            </Button>
          </Input>
        </div>
      </div>
      <div className="pb-5">
        <div className="w-full flex items-center justify-between">
          <Label htmlFor="phoneAuthCode">인증번호</Label>
          <Input
            id="phoneAuthCode"
            variant="timer"
            placeholder="인증번호"
            className="w-[338px]"
            value={code}
            duration={180}
            showTimer={isTimerOn}
            onChange={handleCodeChange}
          />
        </div>
        <div className="w-full flex justify-end">
          <HelperLabel className="w-[338px] min-h-[29px] px-0.5 py-1.5 text-left" variant="error">
            {codeHelper || '\u00A0'}
          </HelperLabel>
        </div>
      </div>
      <Button className="mt-2" onClick={onClickSignUpBtn} disabled={!isCurrentStepValid}>
        {'가입하기'}
      </Button>
    </>
  )
}
