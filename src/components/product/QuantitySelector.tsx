'use client'
import { productStore } from '@/stores/productStore'
import { NumbericField } from '../common/NumbericField/NumbericField'
import { useEffect } from 'react'
import formatKoreanWon from '@/util/formatKoreanWon'

export const QuantitySelector = ({
  productId,
  discountPrice,
}: {
  productId: number
  discountPrice: number
}) => {
  const { quantity, setProductId } = productStore()

  useEffect(() => {
    if (setProductId && productId !== undefined) setProductId(productId)
  }, [])

  return (
    <>
      <div className="pb-6">
        <div className="flex gap-4 items-center">
          <span className="typo-caption1 text-alternative">수량</span>
          <NumbericField productId={productId} />
        </div>
      </div>
      <div className="flex w-full justify-between items-center">
        <span className="typo-h3">총 금액</span>
        <div className="flex gap-2 items-center">
          <span className="typo-body3 text-alternative">총 수량 {quantity}개</span>|
          <span className="text-sale typo-h1">
            {formatKoreanWon(discountPrice * quantity, false)}원
          </span>
        </div>
      </div>
    </>
  )
}
