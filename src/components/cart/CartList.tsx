'use client'

import React from 'react'
import { CartItemActions } from './CartItemActions'
import { CartType } from '@/types/cart/cartType'
import { CartItemHeader } from './CartItemHeader'
import { CartItemList } from './CartItemList'
import { CartProductList } from './CartProductList'
import { EmptyCartMessage } from './EmptyCartMessage'
import { useCart } from '@/hooks/useCart'

interface CartListProps {
  cartItems: CartType
  user: boolean
  setCartItems?: React.Dispatch<React.SetStateAction<CartType>>
}

export const CartList = ({ cartItems, user, setCartItems }: CartListProps) => {
  const {
    toggleHandleSelectAll,
    handleDeleteCartItem,
    handleSelectItem,
    selectedItems,
    selectAll,
    handleDetelteSelectedItems,
  } = useCart({ cartItems, setCartItems, user })

  // cartDetailResponseList가 없거나 비어있는 경우 처리
  if (
    !cartItems ||
    !cartItems.cartDetailResponseList ||
    cartItems.cartDetailResponseList.length === 0
  ) {
    return <EmptyCartMessage />
  }

  return (
    <section className="flex flex-col gap-4 rounded-2xl basis-full">
      <div className="flex flex-col rounded-2xl bg-white">
        <CartItemHeader onSelectAll={selectAll} onHandleSelectAll={toggleHandleSelectAll} />
        {cartItems.cartDetailResponseList.map((item, index) => (
          <CartItemList
            onItem={item}
            onIndex={index}
            onCart={cartItems}
            onHandleSelectItem={handleSelectItem}
            onHandleDeleteCartItem={handleDeleteCartItem}
            key={item.cartId}
            onSelectedItems={selectedItems}
            user={user}
          />
        ))}
        <CartItemActions
          onSelectCheckClick={handleDetelteSelectedItems}
          onSelectedItems={selectedItems}
        />
      </div>

      <CartProductList />
    </section>
  )
}
