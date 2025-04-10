import Button from '@/components/common/Button/Button'
import TextButton from '@/components/common/Button/TextButton'
import Checkbox from '@/components/common/Checkbox/Checkbox'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/common/Dialog/Dialog'
import Divider from '@/components/common/Divider/Divider'
import { Label } from '@/components/common/Label/Label'
import RadioGroup from '@/components/common/Radio/RadioGroup'
import RadioGroupItem from '@/components/common/Radio/RadioGroupItem'
import React, { useState } from 'react'

const AdAlertSetting = () => {
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [adInfoConsent, setAdInfoConsent] = useState('adInfoY')
  const [smsConsent, setSmsConsent] = useState(true)
  const [emailConsent, setEmailConsent] = useState(true)

  const handleSmsCheckboxChange = (checked: boolean | 'indeterminate') => {
    setSmsConsent(checked === true)
  }

  const handleEmailCheckboxChange = (checked: boolean | 'indeterminate') => {
    setEmailConsent(checked === true)
  }

  return (
    <div className="w-full bg-white rounded-lg">
      <div className="flex gap-4 items-center">
        <div className="p-6 pr-0 typo-h3">마케팅 및 광고 알림 설정</div>
        <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
          <DialogTrigger asChild>
            <TextButton
              size={'xs'}
              className="text-alternative underline decoration-solid decoration-auto underline-offset-[3.84px]"
            >
              자세히
            </TextButton>
          </DialogTrigger>
          <DialogContent needClose>
            <DialogHeader className="pb-6 border-b border-line">
              <DialogTitle>마케팅 및 광고 알림 설정</DialogTitle>
            </DialogHeader>
            <DialogDescription className="typo-caption1 text-left pt-8 pb-6">
              서비스의 중요 안내사항 및 주문/배송에 대한 정보는 위 수신 여부와 관계없이 발송됩니다.
              <br />
              문자, 이메일 수신을 선택하면 광고성 정보 수신에 자동 동의 처리됩니다.
            </DialogDescription>
            <DialogFooter>
              <Button type="button" onClick={() => setIsDetailDialogOpen(false)}>
                확인
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Divider />
      <div className="p-6 flex flex-col gap-2">
        <div className="flex gap-4 items-center py-2.5">
          <p className="w-40">광고성 정보 수신 동의</p>
          <RadioGroup
            defaultValue={adInfoConsent}
            onValueChange={(value) => setAdInfoConsent(value)}
            className="flex gap-4"
          >
            <RadioGroupItem
              className="data-[state=checked]:bg-secondary"
              size="lg"
              value="adInfoY"
              id="adInfoY"
              label="동의"
            />
            <RadioGroupItem
              className="data-[state=checked]:bg-secondary"
              size="lg"
              value="adInfoN"
              id="adInfoN"
              label="비동의"
            />
          </RadioGroup>
        </div>
        {adInfoConsent === 'adInfoY' && (
          <div className="ml-44 flex gap-4">
            <Label className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={smsConsent}
                onCheckedChange={handleSmsCheckboxChange}
                className="size-5"
              />
              <span className="text-sm">문자</span>
            </Label>

            <Label className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={emailConsent}
                onCheckedChange={handleEmailCheckboxChange}
                className="size-5"
              />
              <span className="text-sm">이메일</span>
            </Label>
          </div>
        )}
      </div>
      <Divider />
      <div className="p-6">
        <TextButton iconPosition="right" className="typo-button1 text-normal">
          회원탈퇴
        </TextButton>
      </div>
    </div>
  )
}

export default AdAlertSetting
