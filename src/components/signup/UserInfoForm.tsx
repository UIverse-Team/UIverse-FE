import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'
import axios from 'axios'
import Button from '@/components/common/Button/Button'
import { HelperLabel } from '@/components/common/HelperLabel/HelperLabel'
import { Input } from '@/components/common/Input/Input'
import { Label } from '@/components/common/Label/Label'
import { SignUpFormProps } from '@/app/(auth)/signup/page'
import { sendPhoneAuthCode, verifyPhoneAuthCode } from '@/serverActions/auth/phoneVerify/actions'
import { sendSignupForm } from '@/serverActions/auth/signup/actions'

export const UserInfoForm = ({ next, setSignupForm, signupForm }: SignUpFormProps) => {
  const [isCurrentStepValid, setIsCurrentStepValid] = useState(false)
  const [isCodeVerified, setIsCodeVerified] = useState(false)
  const [name, setName] = useState('')
  const [birth, setBirth] = useState('')
  const [gender, setGender] = useState('')
  const [phone, setPhone] = useState('')
  const [rawPhone, setRawPhone] = useState('')
  const [code, setCode] = useState('')
  const [buttonMessage, setButtonMessage] = useState('인증번호 전송')
  const [isPhoneValid, setIsPhoneValid] = useState(false)
  const [isBtnOn, setIsBtnOn] = useState(false)
  const [isTimerOn, setIsTimerOn] = useState(false)
  const [codeHelper, setCodeHelper] = useState('')
  const [codeHelperVariant, setCodeHelperVariant] = useState<'error' | 'success'>('error')

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, '')
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
    const prevPhone = rawPhone
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

    if (prevPhone !== value && isPhoneValid) {
      setIsPhoneValid(false)
      setIsCodeVerified(false)
      setCode('')
      setIsTimerOn(false)
      setButtonMessage('인증번호 전송')
      setCodeHelper('휴대폰번호가 변경되었습니다. 다시 인증해주세요.')
      setCodeHelperVariant('error')
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

  const handleCodeChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6)
    setCode(value)

    if (value.length === 6) {
      try {
        await sendPhoneAuthCode(value)

        setCodeHelperVariant('success')
        setCodeHelper('인증에 성공하셨습니다.')
        setIsPhoneValid(true)
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
      setIsPhoneValid(false)
    }
  }

  const handleClickPhoneVerifyBtn = async () => {
    try {
      await verifyPhoneAuthCode(rawPhone)

      setButtonMessage('인증번호 재전송')
      setIsTimerOn(false)
      setIsCodeVerified(false)
      setIsPhoneValid(false)
      setCode('')
      setCodeHelper('')
      setTimeout(() => {
        setIsTimerOn(true)
      }, 10)
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setCodeHelper('인증번호 전송에 실패했습니다.')
        setCodeHelperVariant('error')
      } else {
        console.log('🚨 네트워크 오류 또는 예기치 않은 에러', error)
      }
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && phone.endsWith('-')) {
      e.preventDefault()
      setPhone((prev) => prev.slice(0, -1))
      setRawPhone((prev) => prev.slice(0, -1))
    }
  }

  useEffect(() => {
    const checkValid = name !== '' && birth !== '' && gender !== '' && isPhoneValid
    setIsCurrentStepValid(checkValid)
  }, [name, birth, gender, isPhoneValid])

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleClickSignUpBtn = () => {
    setSignupForm((prev) => ({
      ...prev,
      name: name,
      birthDate: birth,
      gender: Number(gender) % 2 === 0 ? '여자' : '남자',
      phone: phone,
    }))
    setIsSubmitting(true)
  }

  useEffect(() => {
    const submitForm = async () => {
      if (isSubmitting) {
        try {
          await sendSignupForm(signupForm)
          next()
        } catch (error) {
          console.log('🚨 네트워크 오류 또는 예기치 않은 에러', error)
        }
        setIsSubmitting(false)
      }
    }

    submitForm()
  }, [isSubmitting, signupForm])

  return (
    <>
      <div className="pb-5">
        <div className="w-full flex items-center justify-between">
          <Label className="typo-caption1" htmlFor="name">
            이름
          </Label>
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
          <Label className="typo-caption1" htmlFor="birth">
            생년월일/성별
          </Label>
          <div className="flex gap-2 items-center w-[338px]">
            <Input
              id="birth"
              variant="auth"
              placeholder="YY/MM/DD"
              value={birth}
              onChange={handleBirthChange}
              className="w-[141px]"
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
          <Label className="typo-caption1" htmlFor="phone">
            휴대폰번호
          </Label>
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
                isBtnOn ? 'border-secondary text-strong' : 'border-assist-line text-assistive'
              }
              disabled={!isBtnOn}
              onClick={handleClickPhoneVerifyBtn}
            >
              {buttonMessage}
            </Button>
          </Input>
        </div>
      </div>
      <div className="pb-5">
        <div className="w-full flex items-center justify-between">
          <Label className="typo-caption1" htmlFor="phoneAuthCode">
            인증번호
          </Label>
          <Input
            id="phoneAuthCode"
            variant="auth"
            placeholder="인증번호"
            className="w-[338px]"
            value={code}
            showTimer={isTimerOn}
            disabled={!isTimerOn && !isCodeVerified}
            duration={180}
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
      <Button className="mt-2" onClick={handleClickSignUpBtn} disabled={!isCurrentStepValid}>
        {'가입하기'}
      </Button>
    </>
  )
}
