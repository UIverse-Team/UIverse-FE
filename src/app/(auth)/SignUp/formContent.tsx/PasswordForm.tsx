import { HelperLabel } from '@/components/common/HelperLabel/HelperLabel'
import { SignUpFormProps } from '../page'
import CheckIcon from '/public/check.svg'
import Button from '@/components/common/button/Button'
import { useState } from 'react'

export const PasswordForm = ({ next }: SignUpFormProps) => {
  const [isCurrentStepValid] = useState(false)
  return (
    <>
      <label>Password</label>
      <input />
      <HelperLabel className="w-[338px] min-h-[29px] px-0.5 py-1.5 text-left" variant="error">
        <CheckIcon className="w-3 h-3" />
        {'hi'}
      </HelperLabel>
      <Button onClick={next} disabled={!isCurrentStepValid}>
        {'다음'}
      </Button>
    </>
  )
}
