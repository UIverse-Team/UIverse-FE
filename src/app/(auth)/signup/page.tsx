'use client'

import { AgreementForm } from '@/components/auth/signup/AgreementForm'
import { EmailForm } from '@/components/auth/signup/EmailForm'
import { PasswordForm } from '@/components/auth/signup/PasswordForm'
import { SignUpComplete } from '@/components/auth/signup/SignUpComplete'
import { UserInfoForm } from '@/components/auth/signup/UserInfoForm'
import { useMultiStepForm } from '@/hooks/useMultiStepForm'
import { SignupForm } from '@/types/signup/signupType'
import React, { useState } from 'react'

const SignUpPage = () => {
  const [signupForm, setSignupForm] = useState<SignupForm>({
    ageAgreement: false,
    useAgreement: false,
    picAgreement: false,
    adAgreement: false,
    loginId: '',
    password: '',
    name: '',
    birthDate: '',
    gender: '',
    phone: '',
  })

  const { currentMainTitle, currentSubTitle, currentStep, isLastStep } = useMultiStepForm([
    {
      mainTitle: '서비스 이용약관',
      element: ({ next }) => (
        <AgreementForm next={next} signupForm={signupForm} setSignupForm={setSignupForm} />
      ),
    },
    {
      mainTitle: '회원가입',
      subTitle: '이메일/인증번호를 입력해주세요 (1/3)',
      element: ({ next }) => (
        <EmailForm next={next} signupForm={signupForm} setSignupForm={setSignupForm} />
      ),
    },
    {
      mainTitle: '회원가입',
      subTitle: '비밀번호를 입력해주세요 (2/3)',
      element: ({ next }) => (
        <PasswordForm next={next} signupForm={signupForm} setSignupForm={setSignupForm} />
      ),
    },
    {
      mainTitle: '회원가입',
      subTitle: '회원 정보를 입력해주세요 (3/3)',
      element: ({ next }) => (
        <UserInfoForm next={next} signupForm={signupForm} setSignupForm={setSignupForm} />
      ),
    },
    {
      mainTitle: '회원가입 성공',
      element: () => <SignUpComplete />,
    },
  ])

  return (
    <div className="w-full flex justify-center">
      <form onSubmit={(e) => e.preventDefault()} className="w-[438px]">
        <div
          className={
            isLastStep
              ? 'pt-[60px] typo-h1 flex justify-center'
              : 'typo-h1 flex justify-center py-4'
          }
        >
          {currentMainTitle}
        </div>
        {currentSubTitle && <div className="typo-h2 mt-12">{currentSubTitle}</div>}
        <div className={isLastStep ? 'my-4' : 'my-8'}>{currentStep}</div>
      </form>
    </div>
  )
}

export default SignUpPage
