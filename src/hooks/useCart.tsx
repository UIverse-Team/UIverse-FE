'use client'
import { CartDetailResponse, CartType } from '@/types/cart/cartType'
import { Product } from '@/types/Product/productType'
// import { Product } from '@/types/Product/Product'
import { getCartItem, saveCartItem } from '@/util/cartStorage'
import HttpClient from '@/util/httpClient'
import { useState } from 'react'

interface UserCartProps {
  initialCartItems?: CartType[]
  user: boolean
}

export const useCart = (props?: UserCartProps) => {
  const { initialCartItems = [], user = false } = props || {}
  const [cartItems, setCartItems] = useState<CartType[]>(initialCartItems)
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [selectAll, setSelectAll] = useState(false)
  const KEY = 'guestCart'
  console.log(user)
  const guestAddItem = (productId: number, quantity: number) => {
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
    setCartItems(currentCartItems)
  }

  const userAddItem = async (productId: number, quantity: number) => {
    try {
      const response = await HttpClient.post(`/carts`, {
        saleProductId: productId,
        quantity: quantity,
      })
      return await response.data
    } catch (error) {
      console.error(error)
    }
  }
  const handleSelectItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id))
      setSelectAll(false)
    } else {
      // 선택되지 않은 상품이면 선택 추가
      setSelectedItems([...selectedItems, id])
    }
  }

  const toggleHandleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([])
      setSelectAll(false)
    } else {
      setSelectedItems(
        cartItems.flatMap((item) =>
          item.cartDetailResponseList.map((value: CartDetailResponse) => String(value.cartId)),
        ),
      )
      setSelectAll(true)
    }
  }
  // 회원 시
  //정상 작동
  const userDeleteCartItems = async (selectedItems: string[]) => {
    try {
      await HttpClient.delete(`/carts`, {
        data: { cartIdList: selectedItems },
      })
      console.log(selectedItems)
      setCartItems((prevItems) =>
        prevItems.filter((item) => {
          item.cartDetailResponseList = item.cartDetailResponseList.filter(
            (value) => !selectedItems.includes(String(value.cartId)),
          )

          return item.cartDetailResponseList.length > 0
        }),
      )
    } catch (error) {
      console.error(error)
    }
  }

  const handleDeleteCartItem = (productId: number, isUser: boolean) => {
    console.log(isUser)
    if (isUser) {
      // 회원일 때 - 단일 ID를 배열로 변환하여 처리
      userDeleteCartItems([String(productId)])
    } else {
      // 비회원일 때
      deleteCartItemLocalStorage(productId)
      // 상품 상태 업데이트
      setCartItems((prevItems) =>
        prevItems
          .map((item) => ({
            ...item,
            cartDetailResponseList: item.cartDetailResponseList.filter(
              (value) => value.cartId !== productId,
            ),
          }))
          .filter((item) => item.cartDetailResponseList.length > 0),
      )
    }
  }
  const deleteCartItemLocalStorage = (productId: number) => {
    const localCartItems = getCartItem(KEY)
    if (localCartItems) {
      const parsedItems = JSON.parse(localCartItems)
      const updatedItems = parsedItems.filter((item: Product) => item.id !== productId)
      saveCartItem(KEY, JSON.stringify(updatedItems))
    }
  }

  return {
    guestAddItem,
    userAddItem,
    toggleHandleSelectAll,
    userDeleteCartItems,
    deleteCartItemLocalStorage,
    handleDeleteCartItem,
    handleSelectItem,
    selectedItems,
    selectAll,
    setSelectedItems,
    setSelectAll,
  }
}
