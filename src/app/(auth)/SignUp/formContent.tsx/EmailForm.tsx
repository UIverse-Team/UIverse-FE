import Button from '@/components/common/button/Button'
import { useState } from 'react'
import { SignUpFormProps } from '../page'

export const EmailForm = ({ next }: SignUpFormProps) => {
  const [isCurrentStepValid] = useState(true)

  return (
    <>
      <Button className="mt-2" onClick={next} disabled={!isCurrentStepValid}>
        {'다음'}
      </Button>
    </>
  )
}
