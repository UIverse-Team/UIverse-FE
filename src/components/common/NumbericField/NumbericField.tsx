'use client'
import React, { useEffect } from 'react'
import Add from '/public/icons/add.svg?svgr'
import Minus from '/public/icons/minus.svg?svgr'
import IconButton from '../Button/IconButton'
import { cartStorageType } from '@/types/cart/cartType'
import { getCartItem, saveCartItem } from '@/util/cartStorage'
import { productStore } from '@/stores/productStore'
import { cartQuantity } from '@/services/cartService'

interface NumbericFiledProps {
  itemsQuantity?: number
  cartId?: string
  storageKey?: string
  setQuantity?: React.Dispatch<React.SetStateAction<number>>
  productId?: number
}

export const NumbericField = ({
  cartId,
  storageKey = 'guestCart',
  productId,
}: NumbericFiledProps) => {
  const { quantity, setQuantity, setProductId } = productStore()

  const handleQuantityClick = async (productNum: number, cartId: string | undefined) => {
    //주문 수량 api
    await cartQuantity(productNum, cartId)
  }
  useEffect(() => {
    const loadQuantityFromStorage = () => {
      const storedItems = localStorage.getItem(storageKey)

      if (storedItems) {
        try {
          const parsedItems = JSON.parse(storedItems)

          const item = parsedItems.find(
            (item: cartStorageType) => String(item.id) === String(cartId),
          )

          if (item && item.quantity) {
            setQuantity(item.quantity)
          }
        } catch (error) {
          console.error('로컬 스토리지 데이터 파싱 오류:', error)
        }
      }
    }

    loadQuantityFromStorage()
  }, [cartId, storageKey])

  const updateQuantityInStorage = (newQuantity: number) => {
    const storedItems = getCartItem(storageKey)

    if (storedItems) {
      try {
        const parsedItems = JSON.parse(storedItems)

        const updatedItems = parsedItems.map((item: cartStorageType) => {
          if (String(item.id) === String(cartId)) {
            return { ...item, quantity: newQuantity }
          }
          return item
        })

        saveCartItem(storageKey, JSON.stringify(updatedItems))
      } catch (error) {
        console.error('로컬 스토리지 업데이트 오류:', error)
      }
    }
  }

  const increase = async () => {
    const newQuantity = quantity + 1
    await handleQuantityClick(newQuantity, cartId)

    setQuantity(newQuantity)
    updateQuantityInStorage(newQuantity)
  }

  const decrease = async () => {
    if (quantity <= 1) return
    const newQuantity = quantity - 1
    await handleQuantityClick(newQuantity, cartId)
    setQuantity(newQuantity)
    updateQuantityInStorage(newQuantity)
  }

  useEffect(() => {
    if (setProductId && productId !== undefined) setProductId(productId)
  }, [])

  return (
    <div className="flex items-center border-assist-line bg-white border-2 rounded-[4px] p-1.5">
      <div className="flex gap-2 items-center">
        <IconButton
          onClick={decrease}
          className="bg-gray-50 rounded-[2px] p-[9px]"
          disabled={quantity <= 1}
        >
          <Minus className="w-3 h-3 text-center flex" />
        </IconButton>
        <div className="px-2">
          <span className="typo-body3 ">{quantity}</span>
        </div>
        <IconButton onClick={increase} className="bg-gray-50 p-[9px] rounded-[2px]">
          <Add className="w-3 h-3 text-center flex" />
        </IconButton>
      </div>
    </div>
  )
}
