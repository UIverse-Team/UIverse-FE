'use client'

import { CartType } from '@/types/cart/cartType'
import { PurchaseProductsItemList } from './PurchaseProductsItemList'

interface PurchaseProductsProps {
  cartItems: CartType
}

export const PurchaseProductsList = ({ cartItems }: PurchaseProductsProps) => {
  return (
    <div className=" bg-white rounded-2xl">
      <div className="p-6 border-b-[1px] border-alter-line">
        <h3>주문상품 총 {cartItems.totalItems}건</h3>
      </div>
      <div className=" flex flex-col px-6">
        {cartItems.cartDetailResponseList?.map((item, index) => (
          <PurchaseProductsItemList
            item={item}
            key={item.cartId}
            isLastItem={index === Number(cartItems.totalItems) - 1}
          />
        ))}
      </div>
    </div>
  )
}
