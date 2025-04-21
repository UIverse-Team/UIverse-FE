'use client'
import { productStore } from '@/stores/productStore'
import { NumbericField } from '../common/NumbericField/NumbericField'
import { useEffect } from 'react'
import formatKoreanWon from '@/util/formatKoreanWon'
import Close from '/public/icons/close.svg?svgr'
import { ProductOptions } from '@/types/Product/productDetailType'

interface QuantitySelectorProps {
  discountPrice: number
  option: ProductOptions[]
}

export const QuantitySelector = ({ discountPrice, option }: QuantitySelectorProps) => {
  const { setProductId, getQuantity, setQuantity, productId, productOptions, removeProductOption } =
    productStore()
  const productIdString = String(productId)
  const numberProductId = productId as number

  useEffect(() => {
    if (productId !== undefined) {
      setProductId(numberProductId)
    }
  }, [productId, setProductId])

  const handleQuantityChange = (id: string, newQuantity: number) => {
    setQuantity(id, newQuantity)
  }

  const handleDeleteOptionProductClick = (id: string) => {
    removeProductOption(id)
  }

  // Calculate total quantity
  const calculateTotalQuantity = () => {
    if (!productOptions || productOptions.length === 0) {
      return getQuantity(productIdString)
    }

    return productOptions.reduce((total, opt) => {
      return total + getQuantity(String(opt.id))
    }, 0)
  }

  // Calculate total price
  const calculateTotalPrice = () => {
    if (!productOptions || productOptions.length === 0) {
      return discountPrice * getQuantity(productIdString)
    }

    return productOptions.reduce((total, opt) => {
      return total + discountPrice * getQuantity(String(opt.id))
    }, 0)
  }

  const totalQuantity = calculateTotalQuantity()
  const totalPrice = calculateTotalPrice()

  return (
    <>
      <div className="pb-6">
        {!option || option.length === 0 ? (
          <div className="flex gap-4 items-center">
            <span className="typo-caption1 text-alternative">수량</span>
            <NumbericField
              itemsQuantity={getQuantity(productIdString)}
              setQuantity={(_, newQuantity) => handleQuantityChange(productIdString, newQuantity)}
              saleProductId={productId}
            />
          </div>
        ) : (
          <div className="flex gap-4 items-center flex-col w-full">
            {productOptions.map((option) => (
              <div className="flex gap-2 flex-col  w-full" key={option.id}>
                {option.color && option.size ? (
                  <span className="typo-button2">
                    {option.color} / {option.size}
                  </span>
                ) : option.color ? (
                  <span className="typo-button2">{option.color}</span>
                ) : option.size ? (
                  <span className="typo-button2">{option.size}</span>
                ) : null}

                <div className="flex justify-between items-center w-full">
                  <NumbericField
                    itemsQuantity={getQuantity(String(option.id))}
                    setQuantity={(_, newQuantity) =>
                      handleQuantityChange(String(option.id), newQuantity)
                    }
                    saleProductId={Number(option.id)}
                  />
                  <Close onClick={() => handleDeleteOptionProductClick(option.id)} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex w-full justify-between items-center">
        <span className="typo-h3">총 금액</span>
        <div className="flex gap-2 items-center">
          <span className="typo-body3 text-alternative">총 수량 {totalQuantity}개</span>|
          <span className="text-sale typo-h1">{formatKoreanWon(totalPrice, false)}원</span>
        </div>
      </div>
    </>
  )
}
