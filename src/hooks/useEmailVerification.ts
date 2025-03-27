import { useState, useCallback, ChangeEvent, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { sendEmailAuthCode, verifyEmailAuthCode } from '@/serverActions/auth/emailVerify/actions'
import { EmailUsage } from '@/types/emailVerify/emailType'

interface EmailVerificationFormValues {
  email: string
  code: string
}

interface UseEmailVerificationProps {
  usage: EmailUsage
  onVerificationSuccess?: (email?: string) => void
}

const ERROR_MESSAGES = {
  INVALID_EMAIL: '사용할 수 없는 이메일입니다.',
  TIME_EXPIRED: '입력 시간이 지났어요. 재전송 버튼을 눌러주세요.',
  EMAIL_CHANGED: '이메일이 변경되었습니다. 다시 인증해주세요.',
} as const

export const useEmailVerification = ({
  usage,
  onVerificationSuccess,
}: UseEmailVerificationProps) => {
  const [isTimerOn, setIsTimerOn] = useState(false)
  const [isEmailVerified, setIsEmailVerified] = useState(false)
  const [buttonMessage, setButtonMessage] = useState('인증번호 전송')

  const {
    control,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
    setValue,
    trigger,
  } = useForm<EmailVerificationFormValues>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      code: '',
    },
  })

  // 이메일, 인증번호 값
  const emailValue = watch('email')
  const codeValue = watch('code')

  // 제한시간 내 인증번호 6자리 입력마다 확인
  useEffect(() => {
    const verifyCodeAutomatically = async () => {
      if (codeValue.length === 6 && isTimerOn) {
        const response = await verifyEmailAuthCode(codeValue)

        if (response.success) {
          setIsEmailVerified(true)
          setIsTimerOn(false)
          clearErrors('code')
        } else {
          setIsEmailVerified(false)
          setError('code', {
            type: 'manual',
            message: response.message,
          })
        }
      }
    }

    verifyCodeAutomatically()
  }, [clearErrors, codeValue, isTimerOn, setError])

  // 휴대폰번호 유효성 검사
  const validateEmail = useCallback((email: string) => {
    const cleanedEmail = email.replace(/\s/g, '')
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailRegex.test(cleanedEmail) || ERROR_MESSAGES.INVALID_EMAIL
  }, [])

  const handleClickSendCodeBtn = useCallback(async () => {
    try {
      const isValid = await trigger('email')

      if (isValid) {
        const cleanedEmail = emailValue.replace(/\s/g, '')
        const response = await sendEmailAuthCode(cleanedEmail, usage)

        if (response.success) {
          setIsTimerOn(true)
          setButtonMessage('인증번호 재전송')
          clearErrors('email')
        } else {
          setError('email', { type: 'manual', message: response.message })
        }
      }
    } catch (error) {
      console.error('인증번호 전송 중 오류', error)
      setError('email', { type: 'manual', message: '인증번호 전송에 실패했습니다.' })
    }
  }, [trigger, emailValue, usage, clearErrors, setError])

  const handleTimerExpired = useCallback(() => {
    setIsTimerOn(false)
    setError('code', {
      type: 'manual',
      message: ERROR_MESSAGES.TIME_EXPIRED,
    })
  }, [setError])

  const handleEmailChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.replace(/\s/g, '')

      if (isEmailVerified && emailValue !== value) {
        setIsEmailVerified(false)
        setValue('code', '')
        setIsTimerOn(false)
        setButtonMessage('인증번호 전송')
        setError('code', {
          type: 'manual',
          message: ERROR_MESSAGES.EMAIL_CHANGED,
        })
      }

      return value
    },
    [
      emailValue,
      isEmailVerified,
      setValue,
      setError,
      setIsTimerOn,
      setIsEmailVerified,
      setButtonMessage,
    ],
  )

  const onSubmit = useCallback(() => {
    if (isEmailVerified) {
      onVerificationSuccess?.(emailValue)
    }
  }, [emailValue, isEmailVerified, onVerificationSuccess])

  return {
    control,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isTimerOn,
    isEmailVerified,
    buttonMessage,
    validateEmail,
    handleClickSendCodeBtn,
    handleEmailChange,
    // handleCodeChange,
    handleTimerExpired,
  }
}
