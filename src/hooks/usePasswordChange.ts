import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import debounce from 'lodash.debounce'
import { changePassword, checkExistingPassword } from '@/serverActions/auth/findPw/actions'

interface PasswordChangeFormValues {
  password: string
  passwordCheck: string
}

interface UsePasswordChangeProps {
  email: string
  onSuccess?: () => void
}

export const usePasswordChange = ({ email, onSuccess }: UsePasswordChangeProps) => {
  const [apiError, setApiError] = useState<string | null>(null)
  const [isExistingPassword, setIsExistingPassword] = useState<boolean>(false)

  const {
    control,
    handleSubmit,
    watch,
    formState: { isValid },
  } = useForm<PasswordChangeFormValues>({
    mode: 'onChange',
    defaultValues: {
      password: '',
      passwordCheck: '',
    },
  })

  const password = watch('password')
  const passwordCheck = watch('passwordCheck')

  // 기존 비밀번호 체크
  const checkExistingPasswordValidation = useCallback(
    debounce(async (value: string) => {
      if (!value) return true

      try {
        const response = await checkExistingPassword(email, value)
        setIsExistingPassword(!response.success)

        return response.success
      } catch (error) {
        console.error('Existing password check error:', error)
      }
    }, 400), // 400ms 지연
    [email],
  )

  useEffect(() => {
    if (password) {
      checkExistingPasswordValidation(password)
    }

    // 컴포넌트 언마운트 시 디바운스 취소
    return () => {
      checkExistingPasswordValidation.cancel()
    }
  }, [password, checkExistingPasswordValidation])

  const passwordValidation = {
    password: {
      required: '비밀번호를 입력해주세요.',
      validate: {
        length: (value: string) =>
          (value.length >= 8 && value.length <= 20) || '8-20자 이내여야 합니다.',
        specialChar: (value: string) => /[^a-zA-Z0-9]/.test(value) || '특수문자를 포함해야 합니다.',
        number: (value: string) => /\d/.test(value) || '숫자를 포함해야 합니다.',
        existing: checkExistingPasswordValidation,
      },
    },
    passwordCheck: {
      required: '비밀번호 확인을 입력해주세요.',
      validate: {
        match: (value: string) => value === password || '비밀번호가 일치하지 않습니다.',
      },
    },
  }

  const onSubmit = async (data: PasswordChangeFormValues) => {
    try {
      setApiError(null)
      const response = await changePassword(email, data.password)

      if (response.success) {
        onSuccess?.()
      } else {
        setApiError(response.message)
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : '비밀번호 변경 중 오류가 발생했습니다. 다시 시도해주세요.'
      setApiError(errorMessage)
      console.error('Password change error:', error)
    }
  }

  return {
    password,
    passwordCheck,
    control,
    handleSubmit: handleSubmit(onSubmit),
    isValid,
    apiError,
    passwordValidation,
    isExistingPassword,
  }
}
