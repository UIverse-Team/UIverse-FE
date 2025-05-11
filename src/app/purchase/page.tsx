'use client'
import { CartHeader } from '@/components/cart/CartHeader'
import LoadingSpinner from '@/components/common/Loading/LoadingSpinner'
import { PurchasePayForm } from '@/components/purchase/PurchaseForm'
import { PurchaseProductsList } from '@/components/purchase/PurchaseProductsList'
import { PurchaseShoppingInfo } from '@/components/purchase/PurchaseShoppingInfo'
import { purchaseOrders } from '@/services/purchaseService'
import { productStore } from '@/stores/productStore'
import { useAuthStore } from '@/stores/user'
import { cartStorageType, CartType } from '@/types/cart/cartType'
import { purchaseType } from '@/types/purchase/purchaseType'
import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'

// 검색 매개변수를 처리하는 별도의 컴포넌트 생성
const PurchaseContent = () => {
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
  const [userDefaultress, setUserDefaultAddress] = useState<purchaseType>({
    recipient: '',
    phone: '',
    address: '',
    detailAddress: '',
    zonecode: '',
    defaultYN: false,
  })
  const searchParams = useSearchParams()
  const [cartState, setCartState] = useState<cartStorageType[]>([])

  const { getQuantity, productOptions } = productStore()

  useEffect(() => {
    const fetchCartHandleApi = async () => {
      let orderItemsToUse = []

      const orderItemsParam = searchParams.get('orderItems')
      if (orderItemsParam) {
        try {
          orderItemsToUse = JSON.parse(decodeURIComponent(orderItemsParam))
        } catch (error) {
          console.error('주문 아이템 파싱 오류:', error)
        }
      } else if (productOptions && productOptions.length > 0) {
        orderItemsToUse = productOptions.map((option) => ({
          saleProductId: Number(option.id),
          quantity: getQuantity(String(option.id)),
        }))
      }

      if (isLoggedIn) {
        try {
          //장바구니 목록
          const response = await purchaseOrders([], isLoggedIn, orderItemsToUse)

          if (response) {
            setCartItems(response)
          }
        } catch (error) {
          console.log(error)
        }
      } else {
        const storedItem = localStorage.getItem(KEY)
        if (storedItem) {
          try {
            const parsedCartItems = JSON.parse(storedItem)
            if (parsedCartItems) {
              // 비회원 상태에서 바로 cartState 설정
              setCartState(parsedCartItems)
              //장바구니 목록
              const response = await purchaseOrders(parsedCartItems, isLoggedIn)
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
  }, [isLoggedIn, setCartState, getQuantity, productOptions, searchParams])

  useEffect(() => {
    console.log('cartItems 상태 업데이트됨:', cartItems)
  }, [cartItems])

  return (
    <div className="flex w-full gap-4">
      <div className="flex gap-4 w-full flex-col">
        <PurchaseShoppingInfo
          purchasepageData={purchasepageData}
          setPurchasepageData={setPurchasepageData}
          setUserDefaultAddress={setUserDefaultAddress}
          userDefaultress={userDefaultress}
        />
        <PurchaseProductsList cartItems={cartItems} />
      </div>
      <PurchasePayForm
        cartListItems={cartItems}
        purchasepageData={purchasepageData}
        cartState={cartState}
        setCartItems={setCartItems}
        userDefaultAddress={userDefaultress}
      />
    </div>
  )
}

// 메인 구성 요소
const Purchasepage = () => {
  return (
    <div className="py-8 gap-4 flex flex-col">
      <Suspense fallback={<LoadingSpinner />}>
        <CartHeader />
        <PurchaseContent />
      </Suspense>
    </div>
  )
}

export default Purchasepage
