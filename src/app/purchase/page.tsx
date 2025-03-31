'use client'
import { CartHeader } from '@/components/cart/CartHeader'
import { PurchasePayForm } from '@/components/purchase/PurchaseForm'
import { PurchaseProductsList } from '@/components/purchase/PurchaseProductsList'
import { PurchaseShoppingInfo } from '@/components/purchase/PurchaseShoppingInfo'
import { guestPurchaseOrders } from '@/services/cartService'
import { useAuthStore } from '@/stores/user'
import { CartType } from '@/types/cart/cartType'
import { useEffect, useState } from 'react'

const Purchasepage = () => {
  const [purchasepageData, setPurchasepageData] = useState({
    name: '', //주문자 정보 이름
    phone: '', //휴대폰 번호
    code: '', // 우편번호
    deliveryName: '', // 배송지 이름
    deliveryPhone: '', //배송지 휴대폰번호
    checked: false, //주문자 체크
    isTimerOn: false, // 유효시간
    buttonMessage: '인증코드 전송', //인증번호
    userDetailAddress: '', //상세 주소
    address: '',
  })
  const KEY = 'guestCart'
  const { isLoggedIn } = useAuthStore()
  const [cartItems, setCartItems] = useState<CartType>({
    cartDetailResponseList: [],
    totalItems: 0,
    totalOrderPrice: 0,
    totalDiscountPrice: 0,
    totalPaymentPrice: 0,
  })

  useEffect(() => {
    const fetchCartHandleApi = async () => {
      if (isLoggedIn) {
        console.log(34)
      } else {
        const storedItem = localStorage.getItem(KEY)
        if (storedItem) {
          try {
            const parsedCartItems = JSON.parse(storedItem)
            if (parsedCartItems) {
              const response = await guestPurchaseOrders(parsedCartItems)
              if (response) {
                setCartItems(response)
              }
            }
          } catch (error) {
            console.error('Error parsing cart items:', error)
          }
        }
      }
    }

    fetchCartHandleApi()
  }, [isLoggedIn, setCartItems]) // setCartItems 의존성 추가

  return (
    <div className="py-8 gap-4 flex flex-col">
      <CartHeader />
      <div className="flex w-full gap-4">
        <div className="flex gap-4 w-full flex-col">
          <PurchaseShoppingInfo
            purchasepageData={purchasepageData}
            setPurchasepageData={setPurchasepageData}
          />
          <PurchaseProductsList cartItems={cartItems} />
        </div>
        <PurchasePayForm cartListItems={cartItems} purchasepageData={purchasepageData} />
      </div>
    </div>
  )
}

export default Purchasepage
