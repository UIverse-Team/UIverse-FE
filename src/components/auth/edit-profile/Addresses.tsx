import Button from '@/components/common/Button/Button'
import Divider from '@/components/common/Divider/Divider'
import { Input } from '@/components/common/Input/Input'
import React from 'react'

const Addresses = () => {
  return (
    <div className="w-full bg-white rounded-lg">
      <div className="flex gap-4 items-center">
        <div className="p-6 pr-0 typo-h3">주소록</div>
        <div className="w-[87px]">
          <Button variant="outline" size="sm">
            배송지 관리
          </Button>
        </div>
      </div>
      <Divider />
      <div className="p-6 flex flex-col gap-4">
        <div className="flex gap-4 items-start">
          <p className="w-40 relative top-4">기본배송지</p>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <div className="flex-grow">
                <Input placeholder="우편번호" />
              </div>
              <div className="w-25">
                <Button type="button" className="h-[55px]" size="sm" variant="outline">
                  우편번호 검색
                </Button>
              </div>
            </div>
            <Input className="w-125" placeholder="주소를 검색하세요" />
            <Input className="w-125" placeholder="상세주소를 입력해주세요" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Addresses
