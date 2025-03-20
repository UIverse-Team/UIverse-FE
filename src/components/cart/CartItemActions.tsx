'use client'

// import { useRouter } from 'next/navigation'
// import { useState } from 'react'
import Button from '../common/Button/Button'

export const CartItemActions = () => {
  //   const [selectItems, setSelectItems] = useState<string[]>([])
  //   const router = useRouter()
  return (
    <div className="flex w-[14%] gap-2  ">
      <Button className="typo-button1 bg-white border-[1px] border-gray-200 text-strong rounded-sm">
        선택상품삭제
      </Button>
      <Button className="typo-button1 bg-white border-[1px] border-gray-200 text-strong rounded-sm">
        품절상품삭제
      </Button>
    </div>
  )
}
