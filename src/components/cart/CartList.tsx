'use client'

import React, { useCallback } from 'react'
import { CartItemActions } from './CartItemActions'
import { CartType } from '@/types/cart/cartType'
import { CartItemHeader } from './CartItemHeader'
import { CartItemList } from './CartItemList'
import { CartProductList } from './CartProductList'
import { useCart } from '@/hooks/useCart'
import { EmptyCartMessage } from './EmptyCartMessage'

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

  const handleCartDetailUpdate = useCallback(
    (productId: string, newQuantity: number) => {
      if (!setCartItems) return

      setCartItems((prevCartItems) => {
        const updatedCartDetails = prevCartItems.cartDetailResponseList.map((item) => {
          if (item.saleProductId.toString() === productId) {
            return { ...item, quantity: newQuantity }
          }

          return item
        })

        const newTotalPrice = updatedCartDetails.reduce((total, item) => {
          if (selectedItems.includes(item.saleProductId.toString())) {
            return total + item.orderPrice * item.quantity
          }
          return total
        }, 0)

        return {
          ...prevCartItems,
          cartDetailResponseList: updatedCartDetails,
          totalPrice: newTotalPrice,
        }
      })
    },
    [setCartItems, selectedItems],
  )
  return (
    <section className="flex flex-col gap-4 rounded-2xl basis-full">
      <div className="flex flex-col rounded-2xl bg-white">
        <CartItemHeader onSelectAll={selectAll} onHandleSelectAll={toggleHandleSelectAll} />
        {cartItems.totalItems == 0 ? (
          <EmptyCartMessage />
        ) : (
          cartItems.cartDetailResponseList.map((item, index) => (
            <CartItemList
              onItem={item}
              onIndex={index}
              onCart={cartItems}
              onHandleSelectItem={handleSelectItem}
              onHandleDeleteCartItem={handleDeleteCartItem}
              key={item.cartId}
              onSelectedItems={selectedItems}
              user={user}
              setCartItems={handleCartDetailUpdate}
            />
          ))
        )}
        <CartItemActions
          onSelectCheckClick={handleDetelteSelectedItems}
          onSelectedItems={selectedItems}
        />
      </div>
      <CartProductList />
    </section>
  )
}
