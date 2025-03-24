'use client'

import { useEffect, useState } from 'react'
import { CartList } from './CartList'
import { CartPayForm } from './CartPayForm'
import { getCartItem } from '@/util/cartStorage'
import { cartStorageType, CartType } from '@/types/cart/cartType'
import httpClient from '@/util/httpClient'

export const CartItemForm = () => {
  const [cartItems, setCartItems] = useState<CartType[]>([])
  const KEY = 'guestCart'
  const getItem = getCartItem(KEY)
  const user = false
  const fetchCartHandleApi = async () => {
    if (user) {
      const response = await fetchUserCartItems()
      setCartItems(response)
    } else {
      if (getItem) {
        const cartItems = JSON.parse(getItem)
        const response = await fetchGuestCartItems(cartItems)
        setCartItems(response)
      }
    }
  }

  useEffect(() => {
    fetchCartHandleApi()
  }, [getItem])

  return (
    <>
      <CartList cartItems={cartItems} user={user} setCartItems={setCartItems} />
      <CartPayForm cartListItems={cartItems} />
    </>
  )
}

// 회원용 API 호출 함수
async function fetchUserCartItems() {
  try {
    const response = await httpClient.get(`http://localhost:3000/api/carts`)

    return await response.data
  } catch (error) {
    console.error('Failed to fetch user cart items:', error)
    return []
  }
}

// 비회원용 API 호출 함수
async function fetchGuestCartItems(productIds: cartStorageType[]) {
  try {
    const response = await httpClient.get(
      `http://localhost:3000/api/carts/guest?saleProductId=${JSON.stringify(productIds)}`,
    )

    return await response.data
  } catch (error) {
    console.error('Failed to fetch guest cart items:', error)
    return []
  }
}
