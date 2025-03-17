import Button from '@/components/common/button/Button'
import { SignUpFormProps } from '../page'
import { useState } from 'react'

export const AgreementForm = ({ next }: SignUpFormProps) => {
  const [isCurrentStepValid] = useState(true)

  return (
    <>
      <label>Agreement</label>
      <input />
      <Button onClick={next} disabled={!isCurrentStepValid}>
        {'다음'}
      </Button>
    </>
  )
}
