'use client'
import { useState } from 'react'
import { CartList } from './CartList'
import { CartPayForm } from './CartPayForm'
import type { CartType } from '@/types/cart/cartType'

import { useAuthStore } from '@/stores/user'

export const CartItemForm = () => {
  const [cartItems, setCartItems] = useState<CartType>({
    cartDetailResponseList: [],
    totalItems: 0,
    totalOrderPrice: 0,
    totalDiscountPrice: 0,
    totalPaymentPrice: 0,
  })
  const { isLoggedIn } = useAuthStore()
  return (
    <>
      <CartList cartItems={cartItems} user={isLoggedIn} setCartItems={setCartItems} />
      <CartPayForm cartListItems={cartItems} setCartItems={setCartItems} />
    </>
  )
}
