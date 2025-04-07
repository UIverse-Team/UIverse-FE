'use client'
import { NumbericField } from '../common/NumbericField/NumbericField'
import { useState } from 'react'
import formatKoreanWon from '@/util/formatKoreanWon'

export const QuantitySelector = ({
  productId,
  discountPrice,
  initialQuantity = 1,
  setQuantity: parentSetQuantity,
}: {
  productId: number
  discountPrice: number
  initialQuantity?: number
  setQuantity: (id: string, newQuantity: number) => void
}) => {
  const [quantity, setLocalQuantity] = useState(initialQuantity)

  // Update local quantity and pass to parent through setQuantity
  const handleQuantityChange = (newQuantity: number) => {
    setLocalQuantity(newQuantity)
    parentSetQuantity(String(productId), newQuantity)
  }
  console.log(quantity)
  return (
    <>
      <div>
        <div>수량</div>
        <NumbericField
          itemsQuantity={quantity}
          setQuantity={(id, newQuantity) => handleQuantityChange(newQuantity)}
          saleProductId={productId}
          productId={productId}
        />
      </div>
      <div>
        <div>총 금액</div>
        <div>
          총 수량 {quantity}개| {formatKoreanWon(discountPrice * quantity, false)}원
        </div>
      </div>
    </>
  )
}
