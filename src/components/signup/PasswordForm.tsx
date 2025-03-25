import { ChangeEvent, useEffect, useState } from 'react'
import axios from 'axios'
import { HelperLabel } from '@/components/common/HelperLabel/HelperLabel'
import Button from '@/components/common/Button/Button'
import { Input } from '@/components/common/Input/Input'
import { Label } from '@/components/common/Label/Label'
import { MultiStepProps } from '@/types/multistep/multistep'
import CheckIcon from '/public/icons/check.svg?svgr'

export const PasswordForm = ({ next }: MultiStepProps) => {
  const [isCurrentStepValid, setIsCurrentStepValid] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')
  const [lengthStat, setLengthStat] = useState<'default' | 'success'>('default')
  const [numberStat, setNumberStat] = useState<'default' | 'success'>('default')
  const [specialCharStat, setSpecialCharStat] = useState<'default' | 'success'>('default')
  const [passwordCheckStat, setPasswordCheckStat] = useState<'default' | 'success'>('default')

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, '')
    setPassword(value)

    if (isLengthValid(value)) {
      setLengthStat('success')
    } else {
      setLengthStat('default')
    }

    if (isSpecialCharValid(value)) {
      setSpecialCharStat('success')
    } else {
      setSpecialCharStat('default')
    }

    if (isNumberValid(value)) {
      setNumberStat('success')
    } else {
      setNumberStat('default')
    }
  }

  function isLengthValid(password: string): boolean {
    return password.length >= 8 && password.length <= 20
  }

  function isSpecialCharValid(password: string): boolean {
    const specialCharPattern = /[^a-zA-Z0-9]/
    return specialCharPattern.test(password)
  }

  function isNumberValid(password: string): boolean {
    const numberPattern = /\d/
    return numberPattern.test(password)
  }

  const handlePasswordCheckChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPasswordCheck(value)

    if (isPasswordCheckValid(value)) {
      setPasswordCheckStat('success')
    } else {
      setPasswordCheckStat('default')
    }
  }

  function isPasswordCheckValid(passwordCheck: string): boolean {
    return password === passwordCheck
  }

  useEffect(() => {
    const checkValid =
      lengthStat === 'success' &&
      numberStat === 'success' &&
      specialCharStat === 'success' &&
      passwordCheckStat === 'success'
    setIsCurrentStepValid(checkValid)
  }, [lengthStat, numberStat, specialCharStat, passwordCheckStat])

  const handleClickNextBtn = async () => {
    try {
      await axios.post(`http://localhost:3000/signup/step2`, {
        password: password,
      })

      next()
    } catch (error) {
      console.log('🚨 네트워크 오류 또는 예기치 않은 에러', error)
    }
  }

  return (
    <>
      <div className="pb-6">
        <div className="w-full flex items-center justify-between">
          <Label htmlFor="password">비밀번호</Label>
          <Input
            id="password"
            variant="auth"
            placeholder="비밀번호"
            value={password}
            type="password"
            onChange={handlePasswordChange}
            className="w-[338px]"
          />
        </div>
        <div className="w-full flex justify-end">
          <div className="flex gap-1.5 w-[338px] min-h-[29px] px-0.5 py-1.5 text-left">
            <HelperLabel variant={lengthStat}>
              <CheckIcon className="w-3 h-3" />
              {'8-20자 이내'}
            </HelperLabel>
            <HelperLabel variant={specialCharStat}>
              <CheckIcon className="w-3 h-3" />
              {'특수문자'}
            </HelperLabel>
            <HelperLabel variant={numberStat}>
              <CheckIcon className="w-3 h-3" />
              {'숫자'}
            </HelperLabel>
          </div>
        </div>
        <div className="w-full flex items-center justify-between">
          <Label htmlFor="passwordCheck">비밀번호 확인</Label>
          <Input
            id="passwordCheck"
            variant="auth"
            placeholder="비밀번호"
            value={passwordCheck}
            type="password"
            onChange={handlePasswordCheckChange}
            className="w-[338px]"
          />
        </div>
        <div className="w-full flex justify-end">
          <div className="flex gap-1.5 w-[338px] min-h-[29px] px-0.5 py-1.5 text-left">
            <HelperLabel variant={passwordCheckStat}>
              <CheckIcon className="w-3 h-3" />
              {'비밀번호 일치'}
            </HelperLabel>
          </div>
        </div>
      </div>
      <Button className="mt-2" onClick={handleClickNextBtn} disabled={!isCurrentStepValid}>
        {'다음'}
      </Button>
    </>
  )
}
