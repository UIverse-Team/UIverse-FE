import TextButton from '@/components/common/Button/TextButton'
import Divider from '@/components/common/Divider/Divider'
import RadioGroup from '@/components/common/Radio/RadioGroup'
import RadioGroupItem from '@/components/common/Radio/RadioGroupItem'
import React from 'react'

const AdAlertSetting = () => {
  return (
    <div className="w-full bg-white rounded-lg">
      <div className="flex gap-4 items-center">
        <div className="p-6 pr-0 typo-h3">마케팅 및 광고 알림 설정</div>
        <TextButton
          size={'xs'}
          className="text-alternative underline decoration-solid decoration-auto underline-offset-[3.84px]"
        >
          자세히
        </TextButton>
      </div>
      <Divider />
      <div className="p-6 flex flex-col gap-4">
        <div className="flex gap-4 items-center py-2.5">
          <p className="w-40">이벤트 정보</p>
          <RadioGroup defaultValue="eventY" className="flex gap-4">
            <RadioGroupItem
              className="data-[state=checked]:bg-secondary"
              size="lg"
              value="eventY"
              id="eventY"
              label="수신"
            />
            <RadioGroupItem
              className="data-[state=checked]:bg-secondary"
              size="lg"
              value="eventN"
              id="eventN"
              label="비수신"
            />
          </RadioGroup>
        </div>
        <div className="flex gap-4 items-center py-2.5">
          <p className="w-40">광고성 정보 수신 동의</p>
          <RadioGroup defaultValue="adInfoY" className="flex gap-4">
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
