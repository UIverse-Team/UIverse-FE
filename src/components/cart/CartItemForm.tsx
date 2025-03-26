'use client'
import { Suspense, useEffect, useState } from 'react'
import { CartList } from './CartList'
import { CartPayForm } from './CartPayForm'
import { CartType } from '@/types/cart/cartType'

import { fetchGuestCartItemList, fetchUserCartItemList } from '@/services/cartService'
import LoadingSpinner from '../common/Loading/LoadingSipnner'

export const CartItemForm = () => {
  const [cartItems, setCartItems] = useState<CartType[]>([])

  const KEY = 'guestCart'
  const user = true

  useEffect(() => {
    const fetchCartHandleApi = async () => {
      if (user) {
        const response = await fetchUserCartItemList()
        setCartItems(response)
      } else {
        const storedItem = localStorage.getItem(KEY)
        if (storedItem) {
          try {
            const cartItems = JSON.parse(storedItem)
            if (cartItems && cartItems.length > 0) {
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
      <CartList cartItems={cartItems} user={user} setCartItems={setCartItems} />
      <CartPayForm cartListItems={cartItems} />
    </Suspense>
  )
}
