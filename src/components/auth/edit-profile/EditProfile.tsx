import Button from '@/components/common/Button/Button'
import Divider from '@/components/common/Divider/Divider'
import { HelperLabel } from '@/components/common/HelperLabel/HelperLabel'
import { Input } from '@/components/common/Input/Input'
import React from 'react'

const EditProfile = () => {
  const handleSubmitEditProfile = (e: React.FormEvent): void => {
    e.preventDefault()

    console.log('회원정보수정')
  }
  return (
    <form className="pt-4 pb-2" onSubmit={handleSubmitEditProfile}>
      <div className="w-full bg-white rounded-lg">
        <div className="p-6 typo-h3">회원정보수정</div>
        <Divider />
        <div className="p-6 flex flex-col gap-4">
          <div className="flex gap-4 items-center">
            <p className="w-40">성함</p>
            <Input className="w-125" placeholder="성함을 입력해주세요" />
          </div>
          <div className="flex gap-4 items-center">
            <p className="w-40">이메일</p>
            <Input className="w-125" value={'test@example.com'} disabled />
          </div>
          <div className="flex gap-4 items-center">
            <p className="w-40">휴대폰번호</p>
            <div className="w-125 flex gap-4">
              <div className="w-full">
                <Input value={'010-****-1234'} disabled />
                <HelperLabel className="p-1">
                  휴대폰 번호 변경을 원하시면 본인인증을 진행해주세요.
                </HelperLabel>
              </div>
              <div className="w-25">
                <Button type="button" className="h-[55px]" size="sm" variant="outline">
                  본인인증
                </Button>
              </div>
            </div>
          </div>
          <Divider />
          <div className="flex gap-4 items-center">
            <p className="w-40">현재 비밀번호</p>
            <Input className="w-125" placeholder="현재 비밀번호" />
          </div>
          <div className="flex gap-4 items-center">
            <p className="w-40">새 비밀번호</p>
            <Input className="w-125" placeholder="새 비밀번호" />
          </div>
          <div className="flex gap-4 items-center">
            <p className="w-40">새 비밀번호 확인</p>
            <Input className="w-125" placeholder="새 비밀번호 확인" />
          </div>
          <div className="ml-44 w-25">
            <Button type="submit" size="sm" variant="tertiary">
              변경하기
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default EditProfile
