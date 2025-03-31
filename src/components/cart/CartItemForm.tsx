'use client'
import { Suspense, useState } from 'react'
import { CartList } from './CartList'
import { CartPayForm } from './CartPayForm'
import type { CartType } from '@/types/cart/cartType'

import LoadingSpinner from '../common/Loading/LoadingSpinner'
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
    <Suspense fallback={<LoadingSpinner />}>
      <CartList cartItems={cartItems} user={isLoggedIn} setCartItems={setCartItems} />
      <CartPayForm cartListItems={cartItems} />
    </Suspense>
  )
}
