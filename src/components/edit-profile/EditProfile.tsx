'use client'
import Button from '@/components/common/Button/Button'
import Divider from '@/components/common/Divider/Divider'
import { HelperLabel } from '@/components/common/HelperLabel/HelperLabel'
import { Input } from '@/components/common/Input/Input'
import React, { ChangeEvent, useState } from 'react'
import CheckIcon from '/public/icons/check.svg?svgr'
import { Label } from '@/components/common/Label/Label'
import { User } from '@/types/user/user'
import { formatPhoneNumber } from '@/util/formatPhoneNumber'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/common/Dialog/Dialog'
import { VerifySmsSection } from './VerifySmsSection'

interface EditProfileProps {
  userData: User
}

const EditProfile = ({ userData }: EditProfileProps) => {
  const [password, setPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')
  const [lengthStat, setLengthStat] = useState<'default' | 'success'>('default')
  const [numberStat, setNumberStat] = useState<'default' | 'success'>('default')
  const [specialCharStat, setSpecialCharStat] = useState<'default' | 'success'>('default')
  const [passwordCheckStat, setPasswordCheckStat] = useState<'default' | 'success'>('default')
  const [isVerifySmsModalOpen, setIsVerifySmsModalOpen] = useState(false)
  const [rawPhone, setRawPhone] = useState(userData.phone)
  const [isCodeVerified, setIsCodeVerified] = useState(false)

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

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^a-zA-Z0-9!@#$%^&*()_+=[\]{};':"\\|,.<>?/`~]/g, '')
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

  const handlePasswordCheckChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^a-zA-Z0-9!"#$%&'()*+,\-./:;<=>?@[₩\]^_`{|}~]/g, '')
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

  const handleChangePwBtn = () => {
    console.log('handleChangePwBtn')
  }
  return (
    <div className="w-full bg-white rounded-lg">
      <div className="p-6 typo-h3">회원정보수정</div>
      <Divider />
      <div className="p-6 flex flex-col gap-4">
        <div className="flex gap-4 items-center">
          <p className="w-40">성함</p>
          <Input className="w-125" placeholder="성함을 입력해주세요" value={userData.name} />
        </div>
        <div className="flex gap-4 items-center">
          <p className="w-40">이메일</p>
          <Input className="w-125" value={userData.email} disabled />
        </div>
        <div className="flex gap-4 items-center">
          <p className="w-40">휴대폰번호</p>
          <div className="w-125 flex gap-4">
            <div className="w-full">
              <Input value={formatPhoneNumber(userData.phone, true)} disabled />
              <HelperLabel className="p-1">
                휴대폰 번호 변경을 원하시면 본인인증을 진행해주세요.
              </HelperLabel>
            </div>
            <div className="w-25">
              <Dialog open={isVerifySmsModalOpen} onOpenChange={setIsVerifySmsModalOpen}>
                <DialogTrigger asChild>
                  <Button type="button" className="h-[55px]" size="sm" variant="outline">
                    본인인증
                  </Button>
                </DialogTrigger>
                <DialogContent needClose>
                  <DialogHeader className="pb-6 border-b border-line">
                    <DialogTitle>SMS 본인 인증</DialogTitle>
                  </DialogHeader>
                  <DialogDescription className="typo-caption1 text-left pt-8">
                    <VerifySmsSection
                      rawPhone={rawPhone}
                      setRawPhone={setRawPhone}
                      setIsCodeVerified={setIsCodeVerified}
                    />
                  </DialogDescription>
                  <DialogFooter>
                    <Button type="button" disabled={!isCodeVerified} onClick={handleChangePwBtn}>
                      인증하기
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
        <Divider />
        <div className="flex gap-4 items-center">
          <p className="w-40">현재 비밀번호</p>
          <Input className="w-125" placeholder="현재 비밀번호" />
        </div>
        <div className="flex gap-4 items-center">
          <Label className="typo-body3 w-40 relative top-[-12px]" htmlFor="password">
            새 비밀번호
          </Label>
          <div>
            <Input
              id="password"
              placeholder="새 비밀번호"
              value={password}
              type="password"
              onChange={handlePasswordChange}
              className="w-125"
            />
            <div className="flex justify-end">
              <div className="flex gap-1.5 w-125 min-h-[25px] px-2 py-1 text-left">
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
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <Label className="typo-body3 w-40 relative top-[-12px]" htmlFor="passwordCheck">
            새 비밀번호 확인
          </Label>
          <div>
            <Input
              id="passwordCheck"
              placeholder="새 비밀번호 확인"
              value={passwordCheck}
              type="password"
              onChange={handlePasswordCheckChange}
              className="w-125"
            />
            <div className="flex justify-end">
              <div className="flex gap-1.5 w-125 min-h-[25px] px-2 py-1 text-left">
                <HelperLabel variant={passwordCheckStat}>
                  <CheckIcon className="w-3 h-3" />
                  {'비밀번호 일치'}
                </HelperLabel>
              </div>
            </div>
          </div>
        </div>
        <div className="ml-44 w-25">
          <Button type="submit" size="sm" variant="secondary">
            변경하기
          </Button>
        </div>
      </div>
    </div>
  )
}

export default EditProfile
