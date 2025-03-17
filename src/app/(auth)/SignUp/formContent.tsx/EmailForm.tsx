import Button from '@/components/common/button/Button'
import { Input } from '@/components/common/Input/Input'
import { ChangeEvent, useState } from 'react'
import { SignUpFormProps } from '../page'
import { HelperLabel } from '@/components/common/HelperLabel/HelperLabel'

export const EmailForm = ({ next }: SignUpFormProps) => {
  const [isCurrentStepValid] = useState(true)
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [isBtnOn, setIsBtnOn] = useState(false)
  const [isEmailUsable] = useState(true)
  const [isTimerOn, setIsTimerOn] = useState(false)
  const [buttonMessage, setButtonMessage] = useState('인증번호 전송')
  const [emailHelper] = useState('사용할 수 없는 이메일입니다.')
  const [codeHelper] = useState('인증번호가 일치하지 않습니다.')

  const onClickEmailVerifyBtn = () => {
    setButtonMessage('인증번호 재전송')
    setIsTimerOn(false)
    setTimeout(() => {
      setIsTimerOn(true)
    }, 0)
  }

  const handleBlur = () => {
    if (email.trim() !== '') {
      setIsBtnOn(true)
    } else {
      setIsBtnOn(false)
    }
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)
  }

  const handleCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6)
    setCode(value)
  }

  return (
    <>
      <div className="pb-6">
        <div className="w-full flex items-center justify-between">
          <label htmlFor="email">이메일</label>
          <Input
            id="email"
            variant="auth"
            error={!isEmailUsable}
            placeholder="이메일"
            value={email}
            onFocus={() => setIsBtnOn(true)}
            onBlur={handleBlur}
            onChange={handleEmailChange}
            className="w-[338px]"
          >
            <Button
              variant="outline"
              size="sm"
              className={
                isBtnOn ? 'border-secondary text-secondary' : 'border-assist-line text-assistive'
              }
              onClick={onClickEmailVerifyBtn}
            >
              {buttonMessage}
            </Button>
          </Input>
        </div>
        <div className="w-full flex justify-end">
          <HelperLabel className="w-[338px] min-h-[29px] px-0.5 py-1.5 text-left" variant="error">
            {emailHelper || '\u00A0'}
          </HelperLabel>
        </div>
        <div className="w-full flex items-center justify-between">
          <label htmlFor="emailAuthCode">인증번호</label>
          <Input
            id="emailAuthCode"
            variant="timer"
            placeholder="인증번호 6자리"
            className="w-[338px]"
            value={code}
            showTimer={isTimerOn}
            onChange={handleCodeChange}
          />
        </div>
        <div className="w-full flex justify-end">
          <HelperLabel className="w-[338px] min-h-[29px] px-0.5 py-1.5 text-left" variant="error">
            {codeHelper || '\u00A0'}
          </HelperLabel>
        </div>
      </div>
      <Button className="mt-2" onClick={next} disabled={!isCurrentStepValid}>
        {'다음'}
      </Button>
    </>
  )
}
