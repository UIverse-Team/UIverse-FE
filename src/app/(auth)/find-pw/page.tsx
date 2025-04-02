'use client'

import ChangePwForm from '@/components/findAccount/findPw/ChangePwForm'
import FindPwComplete from '@/components/findAccount/findPw/FindPwComplete'
import FindPwForm from '@/components/findAccount/findPw/FindPwForm'
import { useMultiStepForm } from '@/hooks/useMultiStepForm'
import { useState } from 'react'

const FindIdPage = () => {
  const [verifiedEmail, setVerifiedEmail] = useState<string>('')
  const { currentMainTitle, currentSubTitle, currentStep } = useMultiStepForm([
    {
      mainTitle: '비밀번호 찾기',
      subTitle: '이메일/인증번호를 입력해주세요',
      element: ({ next }) => (
        <FindPwForm onEmailVerified={(email) => setVerifiedEmail(email)} next={next} />
      ),
    },
    {
      mainTitle: '비밀번호 변경',
      subTitle: '비밀번호를 입력해주세요',
      element: ({ next }) => <ChangePwForm email={verifiedEmail} next={next} />,
    },
    {
      mainTitle: '비밀번호 변경 완료',
      element: () => <FindPwComplete />,
    },
  ])

  return (
    <div className="w-full flex justify-center">
      <form onSubmit={(e) => e.preventDefault()} className="w-[438px]">
        <div className="typo-h1 flex justify-center py-4">{currentMainTitle}</div>
        {currentSubTitle && <div className="typo-h2 mt-8 mb-2">{currentSubTitle}</div>}
        <div className="py-8">{currentStep}</div>
      </form>
    </div>
  )
}

export default FindIdPage
