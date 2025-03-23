'use client'
import { useState, useEffect } from 'react'
import Add from '/public/icons/add.svg?svgr'
import Minus from '/public/icons/minus.svg?svgr'
import IconButton from '../Button/IconButton'
import { cartStroageType } from '@/types/cart/cartType'
import { getCartItem, saveCartItem } from '@/util/cartStorage'
import HttpClient from '@/util/httpClient'

interface NumbericFiledProps {
  itemsQuantity?: number
  cartId?: string
  storageKey?: string
}

export const NumbericField = ({
  itemsQuantity = 1,
  cartId,
  storageKey = 'guestCart',
}: NumbericFiledProps) => {
  const [productNum, setProductNum] = useState(itemsQuantity)
  const handleQuantityClick = async (productNum: number, cartId: string | undefined) => {
    try {
      const response = await HttpClient.put(`/carts`, {
        cartId: cartId,
        quantity: productNum,
      })
      return await response.data
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    const loadQuantityFromStorage = () => {
      const storedItems = localStorage.getItem(storageKey)

      if (storedItems) {
        try {
          const parsedItems = JSON.parse(storedItems)

          const item = parsedItems.find(
            (item: cartStroageType) => String(item.id) === String(cartId),
          )

          if (item && item.quantity) {
            setProductNum(item.quantity)
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

        const updatedItems = parsedItems.map((item: cartStroageType) => {
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
    const newQuantity = productNum + 1
    await handleQuantityClick(newQuantity, cartId)

    setProductNum(newQuantity)
    updateQuantityInStorage(newQuantity)
  }

  const decrease = async () => {
    if (productNum <= 1) return
    const newQuantity = productNum - 1
    await handleQuantityClick(newQuantity, cartId)
    setProductNum(newQuantity)
    updateQuantityInStorage(newQuantity)
  }
  return (
    <div className="flex items-center border-assist-line bg-white border-2 rounded-[4px] p-2">
      <IconButton
        onClick={decrease}
        className="bg-gray-50 rounded-[2px] p-[9px]"
        disabled={productNum <= 1}
      >
        <Minus className="w-3 h-3 text-center flex" />
      </IconButton>
      <span className="typo-body3 px-5">{productNum}</span>
      <IconButton onClick={increase} className="bg-gray-50 p-[9px] rounded-[2px]">
        <Add className="w-3 h-3 text-center flex" />
      </IconButton>
    </div>
  )
}
