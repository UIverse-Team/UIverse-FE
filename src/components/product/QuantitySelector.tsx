'use client'
import { useState } from 'react'
import Add from '/public/Add.svg'
import Minus from '/public/Minus.svg'
import Button from '../common/Button/Button'
export const QuantitySelector = () => {
  const [productNum, setProductNum] = useState(1)

  const increase = () => setProductNum((prev) => prev + 1)
  const decrease = () => setProductNum((prev) => Math.max(1, prev - 1))

  return (
    <>
      <div className="pb-4">
        <div className="flex gap-4 items-center">
          <span className="typo-caption1 text-alternative">수량</span>
          <div className="flex items-center border-assistive bg-white border-2 rounded-[4px] p-2">
            <Button onClick={decrease} className="bg-gray-50  h-[38px] rounded-none">
              <Minus />
            </Button>
            <span className="typo-body3 px-5">{productNum}</span>
            <Button onClick={increase} className="bg-gray-50  h-[38px] rounded-none">
              <Add />
            </Button>
          </div>
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
