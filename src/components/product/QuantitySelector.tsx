'use client'
import { NumbericFiled } from '../common/numbericFiled/NumbericFiled'

export const QuantitySelector = () => {
  return (
    <>
      <div className="pb-4">
        <div className="flex gap-4 items-center">
          <span className="typo-caption1 text-alternative">수량</span>
          <NumbericFiled />
        </div>
      </div>
      <div className="flex w-full justify-between items-center">
        <span className="typo-h3">총 금액</span>
        <div className="flex gap-2 items-center">
          <span className="typo-body3 text-alternative">총 수량 1개</span>|
          <span className="text-sale typo-h1">13,560원</span>
        </div>
      </div>
    </>
  )
}
