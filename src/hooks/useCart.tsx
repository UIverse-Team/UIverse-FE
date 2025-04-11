'use client'
import { addProductCart, deleteCartItem } from '@/services/cartService'
import { CartDetailResponse, cartStorageType, CartType } from '@/types/cart/cartType'
import { ProductDetail } from '@/types/Product/productDetailType'
import { getCartItem, saveCartItem } from '@/util/cartStorage'
import React, { useEffect, useState } from 'react'

interface UserCartProps {
  cartItems?: CartType
  setCartItems?: React.Dispatch<React.SetStateAction<CartType>>
  user: boolean
}

export const useCart = ({
  cartItems = {
    cartDetailResponseList: [],
    totalItems: 0,
    totalOrderPrice: 0,
    totalDiscountPrice: 0,
    totalPaymentPrice: 0,
  },
  setCartItems = () => {},
  user = false,
}: UserCartProps) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [selectAll, setSelectAll] = useState(false)
  const KEY = 'guestCart'
  const checkGuestItemExists = (productId: number) => {
    const guestCart = getCartItem(KEY)
    const currentCartItems = guestCart ? JSON.parse(guestCart) : []

    // 장바구니에 상품이 담겨 있는지 확인하기
    const existingItemIndex = currentCartItems.findIndex(
      (item: ProductDetail) => item.id === productId,
    )

    return {
      exists: existingItemIndex >= 0,
      items: currentCartItems,
      existingItemIndex,
    }
  }

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

  const userAddItem = async (productId: number, quantity: number, isForced?: boolean) => {
    //장바구니 상품 추가
    const respone = await addProductCart(productId, quantity, isForced)
    return respone
  }

  const handleSelectItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id))
      setSelectAll(false)
    } else {
      // 선택되지 않은 상품이면 선택 추가
      setSelectedItems([...selectedItems, id])

      // 모든 상품이 선택되었는지 확인
      if (selectedItems.length + 1 === cartItems.cartDetailResponseList.length) {
        setSelectAll(true)
      }
    }
  }

  const calculateSelectedPrices = () => {
    const selectedProducts = cartItems.cartDetailResponseList.filter((item) => {
      if (user) {
        // For logged-in users, use cartId
        return selectedItems.includes(String(item.cartId))
      } else {
        // For non-logged-in users, use saleProductId
        return selectedItems.includes(String(item.saleProductId))
      }
    })
    // 선택된 항목이 없으면 모든 가격을 0으로 설정
    if (selectedProducts.length === 0) {
      return {
        totalOrderPrice: 0,
        totalDiscountPrice: 0,
        totalPaymentPrice: 0,
      }
    }

    // 선택된 항목들의 원가 계산 (orderPrice * quantity)
    const totalOrderPrice = selectedProducts.reduce(
      (sum, item) => sum + item.orderPrice * item.quantity,
      0,
    )

    // 선택된 항목들의 할인 금액 계산 (orderPrice - discountPrice) * quantity
    const totalDiscountPrice = selectedProducts.reduce((sum, item) => {
      // const orderPrice = item.orderPrice ?? 0
      const discountPrice = item.discountPrice ?? 0
      const quantity = item.quantity ?? 1

      const discountValue = Math.abs(discountPrice * quantity)

      return sum + discountValue
    }, 0)
    console.log(totalDiscountPrice)
    return {
      totalOrderPrice,
      totalDiscountPrice,
      totalPaymentPrice: totalOrderPrice - totalDiscountPrice,
    }
  }

  const toggleHandleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([])
      setSelectAll(false)
    } else {
      const allItemIds = cartItems.cartDetailResponseList.map((item: CartDetailResponse) =>
        String(item.saleProductId),
      )
      setSelectedItems(allItemIds)
      setSelectAll(true)
    }
  }

  // 회원 시
  const userDeleteCartItems = async (selectedItems: string[]) => {
    try {
      await deleteCartItem(selectedItems)

      // 선택된 상품을 제외한 새로운 카트 데이터 생성
      const filteredItems = cartItems.cartDetailResponseList.filter(
        (item) => !selectedItems.includes(String(item.cartId)),
      )

      // 상태 업데이트
      setCartItems({
        ...cartItems,
        cartDetailResponseList: filteredItems,
        totalItems: filteredItems.length,
      })

      // 선택 상태 초기화
      setSelectedItems([])
      setSelectAll(false)
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

      // 삭제할 상품을 제외한 새로운 카트 데이터 생성
      const filteredItems = cartItems.cartDetailResponseList.filter(
        (item) => item.saleProductId !== productId,
      )
      // 상태 업데이트
      setCartItems({
        ...cartItems,
        cartDetailResponseList: filteredItems,
        totalItems: filteredItems.length,
      })

      // 선택 목록에서도 제거
      if (selectedItems.includes(String(productId))) {
        setSelectedItems(selectedItems.filter((id) => id !== String(productId)))
      }
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

  // 선택 삭제 버튼 함수
  const handleDetelteSelectedItems = (selectedItems: string[]) => {
    if (user) {
      userDeleteCartItems(selectedItems)
    } else {
      // 비회원일 때
      const localCartItems = getCartItem(KEY)
      if (localCartItems) {
        const parsedItems = JSON.parse(localCartItems)
        const updatedItems = parsedItems.filter((item: cartStorageType) => {
          return !selectedItems.includes(String(item.id))
        })
        saveCartItem(KEY, JSON.stringify(updatedItems))

        // 선택된 상품을 제외한 새로운 카트 데이터 생성
        const filteredItems = cartItems.cartDetailResponseList.filter(
          (item) => !selectedItems.includes(String(item.saleProductId)),
        )

        // 상태 업데이트
        setCartItems({
          ...cartItems,
          cartDetailResponseList: filteredItems,
          totalItems: filteredItems.length,
        })
      }
      setSelectedItems([])
      setSelectAll(false)
    }
  }

  useEffect(() => {
    if (cartItems.cartDetailResponseList.length > 0) {
      const prices = calculateSelectedPrices()
      setCartItems({
        ...cartItems,
        totalOrderPrice: prices.totalOrderPrice,
        totalDiscountPrice: prices.totalDiscountPrice,
        totalPaymentPrice: prices.totalPaymentPrice,
      })
    }
  }, [selectedItems, cartItems.cartDetailResponseList])

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
    checkGuestItemExists,
    calculateSelectedPrices,
  }
}
