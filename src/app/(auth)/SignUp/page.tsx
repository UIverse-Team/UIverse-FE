'use client'

import { useMultiStepForm } from '@/hooks/useMultiStepForm'
import { AgreementForm } from './formContent.tsx/AgreementForm'
import { EmailForm } from './formContent.tsx/EmailForm'
import { PasswordForm } from './formContent.tsx/PasswordForm'
import { UserInfoForm } from './formContent.tsx/UserInfoForm'

export interface SignUpFormProps {
  next: () => void
}

export const SignUp = () => {
  const { currentMainTitle, currentSubTitle, currentStep } = useMultiStepForm([
    {
      mainTitle: '서비스 이용약관',
      element: ({ next }) => <AgreementForm next={next} />,
    },
    {
      mainTitle: '회원가입',
      subTitle: '이메일/인증번호를 입력해주세요 (1/3)',
      element: ({ next }) => <EmailForm next={next} />,
    },
    {
      mainTitle: '회원가입',
      subTitle: '비밀번호를 입력해주세요 (2/3)',
      element: ({ next }) => <PasswordForm next={next} />,
    },
    {
      mainTitle: '회원가입',
      subTitle: '회원 정보를 입력해주세요 (3/3)',
      element: () => <UserInfoForm />,
    },
  ])

  return (
    <div className="w-full flex justify-center">
      <form onSubmit={(e) => e.preventDefault()} className="w-[438px]">
        <div className="typo-h1 flex justify-center">{currentMainTitle}</div>
        {currentSubTitle && <div className="typo-h2 mt-12">{currentSubTitle}</div>}
        <div className="py-8">{currentStep}</div>
      </form>
    </div>
  )
}
