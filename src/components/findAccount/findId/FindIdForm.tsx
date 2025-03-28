import { Controller } from 'react-hook-form'
import { HelperLabel } from '@/components/common/HelperLabel/HelperLabel'
import { Input } from '@/components/common/Input/Input'
import Button from '@/components/common/Button/Button'
import { Label } from '@/components/common/Label/Label'
import { formatPhoneNumber } from '@/util/formatPhoneNumber'
import { MultiStepProps } from '@/types/multistep/multistep'
import { usePhoneVerification } from '@/hooks/usePhoneVerification'

interface FindIdFormProps extends MultiStepProps {
  onUserIdFound: (userId: string) => void
}

const FindIdForm = ({ next, onUserIdFound }: FindIdFormProps) => {
  const {
    control,
    handleSubmit,
    errors,
    isTimerOn,
    isPhoneVerified,
    buttonMessage,
    validatePhoneNumber,
    handleClickSendCodeBtn,
    handleTimerExpired,
  } = usePhoneVerification({
    onVerificationSuccess: (userId) => {
      if (userId) {
        onUserIdFound(userId)
        next()
      }
    },
  })

  return (
    <>
      <div className="pb-6">
        {/* 휴대폰 번호 입력 */}
        <div className="w-full flex items-center justify-between">
          <Label htmlFor="phone">휴대폰 번호</Label>
          <Controller
            name="phone"
            control={control}
            rules={{
              validate: validatePhoneNumber,
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                id="phone"
                variant="auth"
                error={!!errors.phone}
                placeholder="휴대폰번호"
                value={value}
                onChange={(e) => onChange(formatPhoneNumber(e.target.value))}
                className="w-[338px]"
                maxLength={13}
              >
                <Button
                  type="button"
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
            {errors.phone?.message || '\u00A0'}
          </HelperLabel>
        </div>

        {/* 인증번호 입력 */}
        <div className="w-full flex items-center justify-between">
          <Label htmlFor="phoneAuthCode">인증번호</Label>
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
                disabled={!isTimerOn && !isPhoneVerified}
                duration={180}
                onChange={(e) => onChange(e.target.value)}
                onTimerExpired={handleTimerExpired}
              />
            )}
          />
        </div>
        <div className="w-full flex justify-end">
          <HelperLabel
            className="w-[338px] min-h-[29px] px-0.5 py-1.5 text-left"
            variant={isPhoneVerified ? 'success' : 'error'}
          >
            {isPhoneVerified ? '인증에 성공하였습니다.' : errors.code?.message || '\u00A0'}
          </HelperLabel>
        </div>
      </div>

      <Button className="mt-2" disabled={!isPhoneVerified} onClick={handleSubmit}>
        다음
      </Button>
    </>
  )
}

export default FindIdForm
