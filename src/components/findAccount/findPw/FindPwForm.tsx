import { Controller } from 'react-hook-form'
import Button from '@/components/common/Button/Button'
import { Input } from '@/components/common/Input/Input'
import { HelperLabel } from '@/components/common/HelperLabel/HelperLabel'
import { Label } from '@/components/common/Label/Label'
import { MultiStepProps } from '@/types/multistep/multistep'
import { useEmailVerification } from '@/hooks/useEmailVerification'

interface FindPwFormProps extends MultiStepProps {
  onEmailVerified: (email: string) => void
}

const FindPwForm = ({ next, onEmailVerified }: FindPwFormProps) => {
  const {
    control,
    handleSubmit,
    errors,
    isTimerOn,
    isEmailVerified,
    buttonMessage,
    validateEmail,
    handleEmailChange,
    handleClickSendCodeBtn,
    handleTimerExpired,
  } = useEmailVerification({
    usage: 'findpw',
    onVerificationSuccess: (email) => {
      if (email) {
        onEmailVerified(email)
        next()
      }
    },
  })

  return (
    <>
      <div className="pb-6">
        {/* 이메일 입력 */}
        <div className="w-full flex items-center justify-between">
          <Label htmlFor="email">이메일</Label>
          <Controller
            name="email"
            control={control}
            rules={{
              validate: validateEmail,
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                id="email"
                variant="auth"
                error={!!errors.email}
                placeholder="이메일"
                value={value}
                onChange={(e) => onChange(handleEmailChange(e))}
                className="w-[338px]"
              >
                <Button
                  variant="outline"
                  size="sm"
                  className={`w-fit ${value ? 'border-secondary text-strong' : 'border-assist-line text-assistive'}`}
                  disabled={!value}
                  onClick={handleClickSendCodeBtn}
                >
                  {buttonMessage}
                </Button>
              </Input>
            )}
          />
        </div>
        <div className="w-full flex justify-end">
          <HelperLabel className="w-[338px] min-h-[29px] px-0.5 py-1.5 text-left" variant="error">
            {errors.email?.message || '\u00A0'}
          </HelperLabel>
        </div>
        <div className="w-full flex items-center justify-between">
          <Label htmlFor="emailAuthCode">인증번호</Label>
          <Controller
            name="code"
            control={control}
            rules={{
              required: '인증번호를 입력해주세요.',
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                id="phoneAuthCode"
                variant="auth"
                placeholder="인증번호 6자리"
                className="w-[338px]"
                value={value}
                showTimer={isTimerOn}
                disabled={!isTimerOn && !isEmailVerified}
                duration={180}
                onChange={async (e) => onChange(e.target.value.replace(/\D/g, '').slice(0, 6))}
                onTimerExpired={handleTimerExpired}
              />
            )}
          />
        </div>
        <div className="w-full flex justify-end">
          <HelperLabel
            className="w-[338px] min-h-[29px] px-0.5 py-1.5 text-left"
            variant={isEmailVerified ? 'success' : 'error'}
          >
            {isEmailVerified ? '인증에 성공하였습니다.' : errors.code?.message || '\u00A0'}
          </HelperLabel>
        </div>
      </div>
      <Button className="mt-2" disabled={!isEmailVerified} onClick={handleSubmit}>
        {'다음'}
      </Button>
    </>
  )
}

export default FindPwForm
