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

// 회원용 API 호출 함수
// async function fetchUserCartItems() {
//   try {
//     const response = await httpClient.get(`http://localhost:3000/api/carts`)
//     return response.data
//   } catch (error) {
//     console.error('Failed to fetch user cart items:', error)
//     return []
//   }
// }

// // 비회원용 API 호출 함수
// async function fetchGuestCartItems(productIds: cartStorageType[]) {
//   try {
//     const response = await httpClient.get(
//       `http://localhost:3000/api/carts/guest?saleProductId=${JSON.stringify(productIds)}`,
//     )
//     return response.data
//   } catch (error) {
//     console.error('Failed to fetch guest cart items:', error)
//     return []
//   }
// }
