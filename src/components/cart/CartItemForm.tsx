'use client'
import { Suspense, useEffect, useState } from 'react'
import { CartList } from './CartList'
import { CartPayForm } from './CartPayForm'
import { CartType } from '@/types/cart/cartType'

import { fetchGuestCartItemList, fetchUserCartItemList } from '@/services/cartService'
import LoadingSpinner from '../common/Loading/LoadingSipnner'
import { useAuthStore } from '@/stores/user'

export const CartItemForm = () => {
  const [cartItems, setCartItems] = useState<CartType[]>([])
  const { isLoggedIn } = useAuthStore()
  const KEY = 'guestCart'

  useEffect(() => {
    const fetchCartHandleApi = async () => {
      if (isLoggedIn) {
        const response = await fetchUserCartItemList()
        setCartItems(response)
      } else {
        const storedItem = localStorage.getItem(KEY)
        if (storedItem) {
          try {
            const cartItems = JSON.parse(storedItem)
            if (cartItems) {
              const response = await fetchGuestCartItemList(cartItems)
              setCartItems(response)
            }
          } catch (error) {
            console.error('Error parsing cart items:', error)
          }
        }
      }
    }

    fetchCartHandleApi()
  }, [])

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <CartList cartItems={cartItems} user={isLoggedIn} setCartItems={setCartItems} />
      <CartPayForm cartListItems={cartItems} />
    </Suspense>
  )
}
