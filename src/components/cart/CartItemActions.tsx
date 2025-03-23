'use client'

// import { useRouter } from 'next/navigation'
// import { useState } from 'react'
import Button from '../common/Button/Button'

interface CartItemAcitonsProps {
  onSelectCheckClick: (item: string[]) => void
  onSelectedItems: string[]
}

export const CartItemActions = ({ onSelectCheckClick, onSelectedItems }: CartItemAcitonsProps) => {
  return (
    <div className="flex w-[14%] gap-2  ">
      <Button
        className="typo-button1 bg-white border-[1px] border-gray-200 text-strong rounded-sm"
        onClick={() => onSelectCheckClick(onSelectedItems)}
      >
        선택상품삭제
      </Button>
      <Button className="typo-button1 bg-white border-[1px] border-gray-200 text-strong rounded-sm">
        품절상품삭제
      </Button>
    </div>
  )
}
