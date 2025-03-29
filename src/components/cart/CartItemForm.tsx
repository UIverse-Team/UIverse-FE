'use client'
import { Suspense, useEffect, useState } from 'react'
import { CartList } from './CartList'
import { CartPayForm } from './CartPayForm'
import type { cartStorageType, CartType } from '@/types/cart/cartType'

import { fetchGuestCartItemList, fetchUserCartItemList } from '@/services/cartService'
import LoadingSpinner from '../common/Loading/LoadingSipnner'
import { useAuthStore } from '@/stores/user'

export const CartItemForm = () => {
  const [cartItems, setCartItems] = useState<CartType>({
    cartDetailResponseList: [],
    totalItems: 0,
    totalOrderPrice: 0,
    totalDiscountPrice: 0,
    totalPaymentPrice: 0,
  })
  const [guestCartData, setGuestCartData] = useState<cartStorageType[]>([])
  const { isLoggedIn } = useAuthStore()
  const KEY = 'guestCart'

  useEffect(() => {
    const fetchCartHandleApi = async () => {
      if (isLoggedIn) {
        const response = await fetchUserCartItemList()
        setCartItems(response)
        setGuestCartData([]) // Reset guest cart when logged in
      } else {
        const storedItem = localStorage.getItem(KEY)

        if (storedItem) {
          try {
            const parsedCartItems = JSON.parse(storedItem)
            if (parsedCartItems) {
              setGuestCartData(parsedCartItems)

              const response = await fetchGuestCartItemList(parsedCartItems)
              setCartItems(response)
            }
          } catch (error) {
            console.error('Error parsing cart items:', error)
            setGuestCartData([])
          }
        } else {
          setGuestCartData([])
        }
      }
    }

    fetchCartHandleApi()
  }, [isLoggedIn])

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <CartList cartItems={cartItems} user={isLoggedIn} setCartItems={setCartItems} />
      <CartPayForm cartListItems={cartItems} getGuestCart={guestCartData} />
    </Suspense>
  )
}
