import { HelperLabel } from '@/components/common/HelperLabel/HelperLabel'
import { SignUpFormProps } from '../page'
import CheckIcon from '/public/check.svg'
import Button from '@/components/common/button/Button'
import { ChangeEvent, useState } from 'react'
import { Input } from '@/components/common/Input/Input'

export const PasswordForm = ({ next }: SignUpFormProps) => {
  const [isCurrentStepValid] = useState(true)
  const [password, setPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')
  const [lengthStat] = useState<'default' | 'success'>('default')
  const [numberStat] = useState<'default' | 'success'>('success')
  const [specialCharStat] = useState<'default' | 'success'>('default')

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPassword(value)
  }

  const handlePasswordCheckChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPasswordCheck(value)
  }

  return (
    <>
      <div className="pb-6">
        <div className="w-full flex items-center justify-between">
          <label htmlFor="password">비밀번호</label>
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
            <HelperLabel variant={numberStat}>
              <CheckIcon className="w-3 h-3" />
              {'특수문자'}
            </HelperLabel>
            <HelperLabel variant={specialCharStat}>
              <CheckIcon className="w-3 h-3" />
              {'숫자'}
            </HelperLabel>
          </div>
        </div>
        <div className="w-full flex items-center justify-between">
          <label htmlFor="passwordCheck">비밀번호 확인</label>
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
            <HelperLabel>
              <CheckIcon className="w-3 h-3" />
              {'비밀번호 일치'}
            </HelperLabel>
          </div>
        </div>
      </div>
      <Button className="mt-2" onClick={next} disabled={!isCurrentStepValid}>
        {'다음'}
      </Button>
    </>
  )
}
