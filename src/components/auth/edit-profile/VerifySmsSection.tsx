import { ChangeEvent, useEffect, useState, KeyboardEvent } from 'react'
import axios from 'axios'
import Button from '@/components/common/Button/Button'
// import { HelperLabel } from '@/components/common/HelperLabel/HelperLabel'
import { Input } from '@/components/common/Input/Input'
import { sendPhoneAuthCode, verifyPhoneAuthCode } from '@/serverActions/auth/phoneVerify/actions'
import { formatPhoneNumber } from '@/util/formatPhoneNumber'
import { VerifySmsProps } from '@/types/smsVerify/sms'
import { Label } from '@/components/common/Label/Label'

export const VerifySmsSection = ({ rawPhone, setRawPhone, setIsCodeVerified }: VerifySmsProps) => {
  const [phone, setPhone] = useState('')
  const [isPhoneValid, setIsPhoneValid] = useState(false)
  const [code, setCode] = useState('')
  const [isBtnOn, setIsBtnOn] = useState(false)
  const [isTimerOn, setIsTimerOn] = useState(false)
  const [buttonMessage, setButtonMessage] = useState('인증번호 전송')
  // const [codeHelper, setCodeHelper] = useState('')
  // const [codeHelperVariant, setCodeHelperVariant] = useState<'error' | 'success'>('error')

  const isValidPhoneNumber = (phone: string): boolean => {
    return /^01[016789]-?\d{3,4}-?\d{4}$/.test(phone)
  }

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '')
    const formatted = formatPhoneNumber(value)

    setRawPhone(value)
    setPhone(formatted)

    if (value !== rawPhone && isPhoneValid) {
      setIsPhoneValid(false)
      setIsCodeVerified(false)
      setCode('')
      setIsTimerOn(false)
      setButtonMessage('인증번호 전송')
      // setCodeHelper('휴대폰번호가 변경되었습니다. 다시 인증해주세요.')
      // setCodeHelperVariant('error')
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && phone.endsWith('-')) {
      e.preventDefault()
      setPhone(phone.slice(0, -1))
      setRawPhone(rawPhone.slice(0, -1))
    }
  }

  const handleClickPhoneVerifyBtn = async () => {
    try {
      await sendPhoneAuthCode(rawPhone)

      setButtonMessage('인증번호 재전송')
      setIsTimerOn(false)
      setCode('')
      // setCodeHelper('')
      setTimeout(() => setIsTimerOn(true), 10)
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // setCodeHelper('인증번호 전송에 실패했습니다.')
        // setCodeHelperVariant('error')
      } else {
        console.error('네트워크 에러 또는 예외:', error)
      }
    }
  }

  const handleCodeChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6)
    setCode(value)

    if (value.length === 6) {
      try {
        const response = await verifyPhoneAuthCode(value)

        if (response.success) {
          // setCodeHelperVariant('success')
          // setCodeHelper(response.message || '인증에 성공하였습니다.')
          setIsPhoneValid(true)
          setIsCodeVerified(true)
          setIsTimerOn(false)
        } else {
          // setCodeHelperVariant('error')
          // setCodeHelper(response.message || '인증번호가 일치하지 않습니다.')
          setIsCodeVerified(false)
        }
      } catch (error) {
        console.error('인증번호 확인 중 오류:', error)
      }
    }
  }

  const handleTimerExpired = () => {
    // setCodeHelper('입력 시간이 지났어요. 재전송 버튼을 눌러주세요.')
    // setCodeHelperVariant('error')
    setIsPhoneValid(false)
  }

  useEffect(() => {
    setIsBtnOn(isValidPhoneNumber(phone))
  }, [phone])

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="w-full flex items-center justify-between">
          <div className="w-full flex gap-4 items-center">
            <Label className="typo-button1 w-25" htmlFor="phone">
              휴대폰번호
            </Label>
            <Input
              id="phone"
              placeholder="휴대폰번호"
              value={phone}
              onChange={handlePhoneChange}
              onKeyDown={handleKeyDown}
              className="flex-grow"
            ></Input>
            <div className="w-[107px]">
              <Button
                variant="secondary"
                type="button"
                size="sm"
                className="h-[54px]"
                disabled={!isBtnOn}
                onClick={handleClickPhoneVerifyBtn}
              >
                {buttonMessage}
              </Button>
            </div>
          </div>
        </div>
        <div className="w-full flex gap-4 items-center">
          <Label className="typo-button1 w-25" htmlFor="phone">
            인증번호
          </Label>
          <Input
            id="phoneAuthCode"
            placeholder="인증번호"
            className="flex-grow"
            value={code}
            showTimer={isTimerOn}
            disabled={!isTimerOn}
            duration={180}
            onChange={handleCodeChange}
            onTimerExpired={handleTimerExpired}
          />
        </div>
      </div>
    </>
  )
}
