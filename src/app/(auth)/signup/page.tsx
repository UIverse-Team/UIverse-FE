'use client'

import { AgreementForm } from '@/components/signup/AgreementForm'
import { EmailForm } from '@/components/signup/EmailForm'
import { PasswordForm } from '@/components/signup/PasswordForm'
import { SignUpComplete } from '@/components/signup/SignUpComplete'
import { UserInfoForm } from '@/components/signup/UserInfoForm'
import { useMultiStepForm } from '@/hooks/useMultiStepForm'

export interface SignUpFormProps {
  next: () => void
}

const SignUp = () => {
  const { currentMainTitle, currentSubTitle, currentStep, isLastStep } = useMultiStepForm([
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
      element: ({ next }) => <UserInfoForm next={next} />,
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

export default SignUp
