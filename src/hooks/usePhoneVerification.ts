import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { sendPhoneAuthCode, verifyPhoneAuthCode } from '@/serverActions/auth/findId/actions'

interface PhoneVerificationFormValues {
  phone: string
  code: string
}

interface UsePhoneVerificationProps {
  onVerificationSuccess?: () => void
}

export const usePhoneVerification = ({ onVerificationSuccess }: UsePhoneVerificationProps = {}) => {
  const [isTimerOn, setIsTimerOn] = useState(false)
  const [isPhoneVerified, setIsPhoneVerified] = useState(false)
  const [buttonMessage, setButtonMessage] = useState('인증번호 전송')

  const {
    control,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
    trigger,
  } = useForm<PhoneVerificationFormValues>({
    mode: 'onChange',
    defaultValues: {
      phone: '',
      code: '',
    },
  })

  // 휴대폰번호 유효성검사 감지 등록
  const phoneValue = watch('phone')
  const codeValue = watch('code')

  // 휴대폰번호 유효성검사
  const validatePhoneNumber = (value: string) => {
    const cleanedPhone = value.replace(/[^0-9]/g, '')
    const isValidPhone = /^01[0-9]{8,9}$/.test(cleanedPhone)

    return isValidPhone || '올바른 휴대폰 번호를 입력해주세요.'
  }

  // 휴대폰 인증번호 요청
  const handleClickPhoneVerifyBtn = async () => {
    const isValid = await trigger('phone')

    if (isValid) {
      const cleanedPhone = phoneValue.replace(/[^0-9]/g, '')

      const response = await sendPhoneAuthCode(cleanedPhone)

      if (response.success) {
        setIsTimerOn(true)
        setButtonMessage('인증번호 재전송')
        clearErrors('phone')
      } else {
        setError('phone', { type: 'manual', message: response.message })
      }
    }
  }

  // 제한시간 내 인증번호 6자리 입력마다 확인
  useEffect(() => {
    const verifyCodeAutomatically = async () => {
      if (codeValue.length === 6 && isTimerOn) {
        const response = await verifyPhoneAuthCode(codeValue)

        if (response.success) {
          setIsPhoneVerified(true)
          setIsTimerOn(false)
          clearErrors('code')
        } else {
          setIsPhoneVerified(false)
          setError('code', { type: 'manual', message: response.message })
        }
      }
    }

    verifyCodeAutomatically()
  }, [clearErrors, codeValue, isTimerOn, phoneValue, setError])

  // 인증 시간 만료 핸들러
  const handleTimerExpired = () => {
    setIsTimerOn(false)
    setError('code', {
      type: 'manual',
      message: '인증 시간이 만료되었습니다. 다시 인증해주세요.',
    })
  }

  // Submit 핸들러
  const onSubmit = () => {
    if (isPhoneVerified) {
      onVerificationSuccess?.()
    }
  }

  return {
    control,
    handleSubmit,
    errors,
    isTimerOn,
    isPhoneVerified,
    buttonMessage,
    phoneValue,
    validatePhoneNumber,
    handleClickPhoneVerifyBtn,
    handleTimerExpired,
    onSubmit,
  }
}
