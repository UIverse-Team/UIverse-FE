import React from 'react'
import { Controller } from 'react-hook-form'
import Button from '@/components/common/Button/Button'
import { Input } from '@/components/common/Input/Input'
import { HelperLabel } from '@/components/common/HelperLabel/HelperLabel'
import { Label } from '@/components/common/Label/Label'
import { MultiStepProps } from '@/types/multistep/multistep'
import { usePasswordChange } from '@/hooks/usePasswordChange'
import CheckIcon from '/public/icons/check.svg?svgr'

interface ChangePwFormProps extends MultiStepProps {
  email: string
}

const ChangePwForm = ({ email, next }: ChangePwFormProps) => {
  const { password, passwordCheck, control, handleSubmit, isValid, apiError, passwordValidation } =
    usePasswordChange({
      email,
      onSuccess: next,
    })

  return (
    <>
      <div className="pb-6">
        <div className="w-full flex items-center justify-between">
          <Label className="typo-caption1" htmlFor="password">
            비밀번호
          </Label>
          <Controller
            name="password"
            control={control}
            rules={passwordValidation.password}
            render={({ field }) => (
              <Input
                {...field}
                id="password"
                variant="auth"
                placeholder="비밀번호"
                type="password"
                className="w-[338px]"
              />
            )}
          />
        </div>
        <div className="w-full flex justify-end">
          <div className="flex gap-1.5 w-[338px] min-h-[29px] px-2 py-1 text-left">
            <HelperLabel
              variant={
                password && passwordValidation.password.validate.length(password) === true
                  ? 'success'
                  : 'default'
              }
            >
              <CheckIcon className="size-3" />
              {'8-20자 이내'}
            </HelperLabel>
            <HelperLabel
              variant={
                password && passwordValidation.password.validate.specialChar(password) === true
                  ? 'success'
                  : 'default'
              }
            >
              <CheckIcon className="size-3" />
              {'특수문자'}
            </HelperLabel>
            <HelperLabel
              variant={
                password && passwordValidation.password.validate.number(password) === true
                  ? 'success'
                  : 'default'
              }
            >
              <CheckIcon className="size-3" />
              {'숫자'}
            </HelperLabel>
          </div>
        </div>

        <div className="w-full flex items-center justify-between">
          <Label className="typo-caption1" htmlFor="passwordCheck">
            비밀번호 확인
          </Label>
          <Controller
            name="passwordCheck"
            control={control}
            rules={passwordValidation.passwordCheck}
            render={({ field }) => (
              <Input
                {...field}
                id="passwordCheck"
                variant="auth"
                placeholder="비밀번호 확인"
                type="password"
                className="w-[338px]"
              />
            )}
          />
        </div>
        <div className="w-full flex justify-end">
          <div className="flex gap-1.5 w-[338px] min-h-[29px] px-2 py-1 text-left">
            <HelperLabel
              variant={
                passwordCheck &&
                passwordValidation.passwordCheck.validate.match(passwordCheck) === true
                  ? 'success'
                  : 'default'
              }
            >
              <CheckIcon className="size-3" />
              {'비밀번호 일치'}
            </HelperLabel>
            {apiError && <HelperLabel variant="error">{apiError}</HelperLabel>}
          </div>
        </div>
      </div>
      <Button className="mt-2" disabled={!isValid} onClick={handleSubmit}>
        다음
      </Button>
    </>
  )
}

export default ChangePwForm
