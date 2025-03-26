'use client'

import FindIdComplete from '@/components/findAccount/findId/FindIdComplete'
import FindIdForm from '@/components/findAccount/findId/FindIdForm'
import { useMultiStepForm } from '@/hooks/useMultiStepForm'

const FindIdPage = () => {
  const { currentMainTitle, currentSubTitle, currentStep } = useMultiStepForm([
    {
      mainTitle: '아이디(이메일) 찾기',
      subTitle: '휴대폰 본인인증을 진행해주세요',
      element: ({ next }) => <FindIdForm next={next} />,
    },
    {
      mainTitle: '아이디(이메일) 찾기',
      subTitle: '가입하신 계정으로 로그인 해주세요',
      element: () => <FindIdComplete />,
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
