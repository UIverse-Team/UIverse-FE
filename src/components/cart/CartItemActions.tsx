'use client'

// import { useRouter } from 'next/navigation'
// import { useState } from 'react'
import Button from '../common/Button/Button'

interface CartItemAcitonsProps {
  onSelectCheckClick: () => void
}

export const CartItemActions = ({ onSelectCheckClick }: CartItemAcitonsProps) => {
  //   const [selectItems, setSelectItems] = useState<string[]>([])
  //   const router = useRouter()
  return (
    <div className="flex w-[14%] gap-2  ">
      <Button
        className="typo-button1 bg-white border-[1px] border-gray-200 text-strong rounded-sm"
        onClick={onSelectCheckClick}
      >
        선택상품삭제
      </Button>
      <Button className="typo-button1 bg-white border-[1px] border-gray-200 text-strong rounded-sm">
        품절상품삭제
      </Button>
    </div>
  )
}
