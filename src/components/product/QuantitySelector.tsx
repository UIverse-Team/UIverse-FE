'use client'
import { productStore } from '@/stores/productStore'
import { NumbericField } from '../common/NumbericField/NumbericField'
import { useEffect } from 'react'
import formatKoreanWon from '@/util/formatKoreanWon'
import Close from '/public/icons/close.svg?svgr'

export const QuantitySelector = ({ discountPrice }: { discountPrice: number }) => {
  const { setProductId, getQuantity, setQuantity, productId, productOptions } = productStore()
  const productIdString = String(productId)
  const quantity = getQuantity(productIdString)
  const numberProductId = productId as number

  useEffect(() => {
    if (productId !== undefined) {
      setProductId(numberProductId)
    }
  }, [productId, setProductId])

  const handleQuantityChange = (id: string, newQuantity: number) => {
    setQuantity(id, newQuantity)
  }

  return (
    <>
      <div className="pb-6">
        <div className="flex gap-4 items-center">
          {!productOptions && <span className="typo-caption1 text-alternative">수량</span>}
          {/* option이 없으면 numric만 있으면 size와 color 둘다 존재하면 보여주게 해야 함. */}
          {productOptions.map((option) => (
            <div className="flex gap-2 flex-col bg-primary" key={option.id}>
              <span className="typo-button2">
                {option.color} / {option.size}
              </span>
              <div className="flex justify-between items-center w-full ">
                <NumbericField
                  itemsQuantity={quantity}
                  setQuantity={handleQuantityChange}
                  saleProductId={productId}
                />
                <Close />
              </div>
            </div>
          ))}
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
