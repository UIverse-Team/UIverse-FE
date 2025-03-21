'use client'
import { Product } from '@/types/Product/Product'
// import { Product } from '@/types/Product/Product'
import { getCartItem, saveCartItem } from '@/util/cartStorage'
import { useState } from 'react'

export const useCart = () => {
  const [items, setItems] = useState([])
  console.log(items)
  const KEY = 'guestCart'
  const addItem = (productId: number, quantity: number) => {
    const guestCart = getCartItem(KEY)

    const currentCartItems = guestCart ? JSON.parse(guestCart) : []

    //장바구니에 상품이 담겨 있는지 확인하기
    const existingItemIndex = currentCartItems.findIndex((item: Product) => item.id === productId)

    if (existingItemIndex >= 0) {
      //이미 장바구니에 물품이 존재하므로 수량 증가
      currentCartItems[existingItemIndex].quantity += quantity
    } else {
      //새 상품 추가
      currentCartItems.push({ id: productId, quantity })
    }
    saveCartItem(KEY, JSON.stringify(currentCartItems))
    setItems(currentCartItems)
  }
  return { addItem }
}
