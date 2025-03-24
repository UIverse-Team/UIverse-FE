import Button from '@/components/common/Button/Button'
import { Input } from '@/components/common/Input/Input'
import { ChangeEvent, useState } from 'react'
import { SignUpFormProps } from '@/app/(auth)/signup/page'
import { HelperLabel } from '@/components/common/HelperLabel/HelperLabel'
import { Label } from '@/components/common/Label/Label'
import HttpClient from '@/util/httpClient'
import axios, { AxiosError } from 'axios'

export const EmailForm = ({ next, setSignupForm }: SignUpFormProps) => {
  const [isCurrentStepValid, setIsCurrentStepValid] = useState(false)
  const [email, setEmail] = useState('')
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const [code, setCode] = useState('')
  const [isBtnOn, setIsBtnOn] = useState(false)
  const [isEmailUsable] = useState(true)
  const [isTimerOn, setIsTimerOn] = useState(false)
  const [buttonMessage, setButtonMessage] = useState('인증번호 전송')
  const [emailHelper, setEmailHelper] = useState('')
  const [codeHelper, setCodeHelper] = useState('')
  const [codeHelperVariant, setCodeHelperVariant] = useState<'error' | 'success'>('error')
  const [isCodeVerified, setIsCodeVerified] = useState(false)

  const handleClickEmailVerifyBtn = async () => {
    try {
      await HttpClient.post(`/signup/emailSend`, {
        email: email,
      })

      setButtonMessage('인증번호 재전송')
      setIsTimerOn(false)
      setIsCodeVerified(false)
      setIsCurrentStepValid(false)
      setCode('')
      setCodeHelper('')
      setTimeout(() => {
        setIsTimerOn(true)
      }, 10)
    } catch (error) {
      const axiosError = error as AxiosError

      if (axiosError.response?.status === 409) {
        setEmailHelper('사용할 수 없는 이메일입니다.')
        setIsBtnOn(false)
      } else {
        console.log('🚨 네트워크 오류 또는 예기치 않은 에러', axiosError)
      }
    }
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, '')
    const prevEmail = email
    setEmail(value)

    if (prevEmail !== value && isCurrentStepValid) {
      setIsCurrentStepValid(false)
      setIsCodeVerified(false)
      setCode('')
      setIsTimerOn(false)
      setButtonMessage('인증번호 전송')
      setCodeHelper('이메일이 변경되었습니다. 다시 인증해주세요.')
      setCodeHelperVariant('error')
    }

    if (isValidEmail(value)) {
      setEmailHelper('')
      setIsBtnOn(true)
    } else {
      setEmailHelper('사용할 수 없는 이메일입니다.')
      setIsBtnOn(false)
    }
  }

  function isValidEmail(email: string) {
    return emailRegex.test(email)
  }

  const handleCodeChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6)
    setCode(value)

    if (value.length === 6) {
      try {
        await HttpClient.post(`/signup/emailVeify`, {
          params: { code: value },
        })

        setCodeHelper('인증에 성공하셨습니다.')
        setCodeHelperVariant('success')
        setIsCurrentStepValid(true)
        setIsCodeVerified(true)
        setIsTimerOn(false)
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          setCodeHelper('인증번호가 일치하지 않습니다.')
          setCodeHelperVariant('error')
          setIsCodeVerified(false)
        } else {
          console.log('🚨 네트워크 오류 또는 예기치 않은 에러', error)
        }
      }
    }
  }

  const handleTimerExpired = () => {
    setCodeHelper('입력 시간이 지났어요. 재전송 버튼을 눌러주세요.')
    setCodeHelperVariant('error')
    if (!isCodeVerified) {
      setIsCurrentStepValid(false)
    }
  }

  const handleClickNextBtn = async () => {
    try {
      setSignupForm((prev) => ({
        ...prev,
        email: email,
      }))

      next()
    } catch (error) {
      console.log('🚨 네트워크 오류 또는 예기치 않은 에러', error)
    }
  }

  return (
    <>
      <div className="pb-6">
        <div className="w-full flex items-center justify-between">
          <Label className="typo-caption1" htmlFor="email">
            이메일
          </Label>
          <Input
            id="email"
            variant="auth"
            error={!isEmailUsable}
            placeholder="이메일"
            value={email}
            onChange={handleEmailChange}
            className="w-[338px]"
          >
            <Button
              variant="outline"
              size="sm"
              className={
                isBtnOn ? 'border-secondary text-strong' : 'border-assist-line text-assistive'
              }
              disabled={!isBtnOn}
              onClick={handleClickEmailVerifyBtn}
            >
              {buttonMessage}
            </Button>
          </Input>
        </div>
        <div className="w-full flex justify-end">
          <HelperLabel className="w-[338px] min-h-[29px] px-2 py-1 text-left" variant="error">
            {emailHelper || '\u00A0'}
          </HelperLabel>
        </div>
        <div className="w-full flex items-center justify-between">
          <Label className="typo-caption1" htmlFor="emailAuthCode">
            인증번호
          </Label>
          <Input
            id="emailAuthCode"
            variant="auth"
            placeholder="인증번호 6자리"
            className="w-[338px]"
            value={code}
            showTimer={isTimerOn}
            disabled={!isTimerOn && !isCodeVerified}
            duration={300}
            onChange={handleCodeChange}
            onTimerExpired={handleTimerExpired}
          />
        </div>
        <div className="w-full flex justify-end">
          <HelperLabel
            className="w-[338px] min-h-[29px] px-2 py-1 text-left"
            variant={codeHelperVariant}
          >
            {codeHelper || '\u00A0'}
          </HelperLabel>
        </div>
      </div>
      <Button className="mt-2" onClick={handleClickNextBtn} disabled={!isCurrentStepValid}>
        {'다음'}
      </Button>
    </>
  )
}
