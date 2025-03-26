'use client'
import { addProdcutCart, deleteCartItem } from '@/services/cartService'
import { CartDetailResponse, cartStorageType, CartType } from '@/types/cart/cartType'
import { ProductDetail } from '@/types/Product/productDetailType'
import { getCartItem, saveCartItem } from '@/util/cartStorage'
import React, { useState } from 'react'

interface UserCartProps {
  cartItems?: CartType[]
  setCartItems?: React.Dispatch<React.SetStateAction<CartType[]>>
}

export const useCart = ({ cartItems = [], setCartItems = () => {} }: UserCartProps = {}) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [selectAll, setSelectAll] = useState(false)
  const KEY = 'guestCart'

  const guestAddItem = (productId: number, quantity: number) => {
    const guestCart = getCartItem(KEY)

    const currentCartItems = guestCart ? JSON.parse(guestCart) : []

    //장바구니에 상품이 담겨 있는지 확인하기
    const existingItemIndex = currentCartItems.findIndex(
      (item: ProductDetail) => item.id === productId,
    )

    if (existingItemIndex >= 0) {
      //이미 장바구니에 물품이 존재하므로 수량 증가
      currentCartItems[existingItemIndex].quantity += quantity
    } else {
      //새 상품 추가
      currentCartItems.push({ id: productId, quantity })
    }
    saveCartItem(KEY, JSON.stringify(currentCartItems))
  }

  const userAddItem = async (productId: number, quantity: number) => {
    //장바구니 상품 추가
    await addProdcutCart(productId, quantity)
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
      await deleteCartItem(selectedItems)
      setCartItems((prevItems: CartType[]) =>
        prevItems
          .map((item: CartType) => ({
            ...item,
            cartDetailResponseList: item.cartDetailResponseList.filter(
              (value) => !selectedItems.includes(String(value.cartId)),
            ),
          }))
          .filter((item) => item.cartDetailResponseList.length > 0),
      )
    } catch (error) {
      console.error(error)
    }
  }

  const handleDeleteCartItem = (productId: number, user: boolean) => {
    if (user) {
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
      const updatedItems = parsedItems.filter((item: ProductDetail) => item.id !== productId)
      saveCartItem(KEY, JSON.stringify(updatedItems))
    }
  }

  // // 선택 삭제 버튼 함수
  const handleDetelteSelectedItems = (selectedItems: string[]) => {
    const user = false
    if (user) {
      userDeleteCartItems(selectedItems)
      setSelectAll(false)
    } else {
      //비회원 일때
      const localCartItems = getCartItem(KEY)
      if (localCartItems) {
        const parsedItems = JSON.parse(localCartItems)

        const updatedItems = parsedItems.filter((item: cartStorageType) => {
          return !selectedItems.includes(String(item.id))
        })
        saveCartItem(KEY, JSON.stringify(updatedItems))
        setCartItems((prevItems) =>
          prevItems
            .map((item) => {
              const updatedDetails = item.cartDetailResponseList.filter(
                (detail) => !selectedItems.includes(String(detail.cartId)),
              )
              return {
                ...item,
                cartDetailResponseList: updatedDetails,
                totalItems: updatedDetails.length,
              }
            })
            .filter((item) => item.cartDetailResponseList.length > 0),
        )
      }
      setSelectedItems([])
      setSelectAll(false)
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
    handleDetelteSelectedItems,
  }
}
