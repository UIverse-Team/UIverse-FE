'use client'

import Button from '../common/Button/Button'

interface CartItemAcitonsProps {
  onSelectCheckClick: (item: string[]) => void
  onSelectedItems: string[]
}

export const CartItemActions = ({ onSelectCheckClick, onSelectedItems }: CartItemAcitonsProps) => {
  return (
    <div className="flex w-[14%] gap-2  ">
      <Button variant={'outline'} size={'md'} onClick={() => onSelectCheckClick(onSelectedItems)}>
        선택상품삭제
      </Button>
      <Button variant={'outline'} size={'md'}>
        품절상품삭제
      </Button>
    </div>
  )
}
