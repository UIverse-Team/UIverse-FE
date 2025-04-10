'use client'
import Button from '@/components/common/Button/Button'
import { fetchGuestCartItemList } from '@/services/cartService'
import {
  guestOnePurchase,
  guestPurchase,
  userOnePurchase,
  userPurchase,
} from '@/services/purchaseService'
import { useAuthStore } from '@/stores/user'
import { cartStorageType, CartType } from '@/types/cart/cartType'
import { PurchasePageData, purchaseType } from '@/types/purchase/purchaseType'
import formatKoreanWon from '@/util/formatKoreanWon'
import { removeLocalStorageItem } from '@/util/localstorageUtil'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { Suspense, useEffect, useState } from 'react'
import LoadingSpinner from '../common/Loading/LoadingSpinner'
import { ROUTES } from '@/constants/routes'

interface CartPayFormProps {
  cartListItems: CartType
  purchasepageData: PurchasePageData
  setCartItems: React.Dispatch<React.SetStateAction<CartType>>
  cartState: cartStorageType[]
  userDefaultAddress: purchaseType
}

export const PurchasePayForm = ({
  cartListItems,
  purchasepageData,
  setCartItems,
  userDefaultAddress,
}: CartPayFormProps) => {
  const KEY = 'guestCart'
  const { isLoggedIn } = useAuthStore()
  const [guestCartData, setGuestCartData] = useState<cartStorageType[]>([])
  const search = useSearchParams()
  const saleProductId = search.get('saleProductId')
  const quantity = search.get('quantity')
  const router = useRouter()

  useEffect(() => {
    const fetchCartHandleApi = async () => {
      const storedItem = localStorage.getItem(KEY)

      if (storedItem) {
        try {
          const parsedCartItems = JSON.parse(storedItem)
          if (parsedCartItems) {
            setGuestCartData(parsedCartItems)

            const response = await fetchGuestCartItemList(parsedCartItems)
            if (response) setCartItems(response)
          }
        } catch (error) {
          console.error('Error parsing cart items:', error)
          setGuestCartData([])
        }
      } else {
        setGuestCartData([])
      }
    }

    fetchCartHandleApi()
  }, [isLoggedIn, setCartItems]) // setCartItems 의존성 추가

  const handleGuestCheckout = async (guestCartData: cartStorageType[]) => {
    const isDirectPurchase = saleProductId !== null && quantity !== null
    if (isLoggedIn) {
      //회원 1개
      if (isDirectPurchase) {
        // 회원 1개 상품 직접 구매
        try {
          const response = await userOnePurchase(
            userDefaultAddress,
            Number(saleProductId),
            Number(quantity),
          )

          router.push(ROUTES.PURCHASE_COMPLETE)

          return response
        } catch (error) {
          console.error(error)
        }
      } else {
        //회원 여러개
        try {
          const response = await userPurchase(userDefaultAddress, cartListItems)
          router.push(ROUTES.PURCHASE_COMPLETE)
          return response
        } catch (error) {
          console.error(error)
        }
      }
    } else {
      //비회원 1개
      if (isDirectPurchase) {
        try {
          const response = await guestOnePurchase(purchasepageData, guestCartData)
          if (response?.id) {
            removeLocalStorageItem('guestCart')
            router.push(ROUTES.PURCHASE_COMPLETE)
          }
        } catch (error) {
          console.error(error)
        }
      } else {
        try {
          const response = await guestPurchase(purchasepageData, guestCartData)
          if (response?.id) {
            removeLocalStorageItem('guestCart')
            router.push(`${ROUTES.PURCHASE_COMPLETE}?orderNumber=${response?.orderNumber}`)
          }
          return response
        } catch (error) {
          console.error(error)
        }
      }
    }
  }

  // 회원/비회원 상태에 따라 다른 필드를 검사
  const isButtonDisabled = () => {
    if (isLoggedIn) {
      // 회원인 경우 userDefaultAddress 값을 확인
      const isAddressEmpty =
        !userDefaultAddress.recipient ||
        !userDefaultAddress.phone ||
        !userDefaultAddress.address ||
        !userDefaultAddress.detailAddress ||
        !userDefaultAddress.zonecode

      return isAddressEmpty || cartListItems.totalPaymentPrice === 0
    } else {
      // 비회원인 경우 purchasepageData의 값을 확인
      const requiredFields = [
        'name',
        'phone',
        'code',
        'deliveryName',
        'deliveryPhone',
        'buttonMessage',
        'userDetailAddress',
        'address',
      ]

      const isAnyRequiredFieldEmpty = requiredFields.some(
        (field) => !purchasepageData[field as keyof PurchasePageData],
      )

      return isAnyRequiredFieldEmpty || cartListItems.totalPaymentPrice === 0
    }
  }
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <section className="flex rounded-2xl flex-col gap-4 h-[363px] bg-white py-4 shrink-0 basis-[256px] sticky top-10">
        <div className="flex justify-between w-full flex-col items-center">
          <h2 className="typo-h3 flex w-full border-b-[1px] border-gray-75 py-2 px-4">주문금액</h2>
          <div className="flex flex-col w-full">
            <div className="flex justify-between border-b-[1px] border-gray-75 typo-body3  px-4 border py-2 w-full ">
              <h3 className="typo-body3">총 주문 금액</h3>
              <span className="typo-button1">
                {formatKoreanWon(cartListItems.totalOrderPrice ?? 0, false)}원
              </span>
            </div>
            <div className="flex justify-between border-b-[1px]  border-gray-75 border py-2 px-4">
              <h3 className="typo-body3">배송비</h3>
              <span className="typo-button1">0원</span>
            </div>
            <div className="flex justify-between border-b-[1px]  border-gray-75 border py-2 px-4">
              <h3 className="typo-body3 ">할인금액</h3>
              <span className="typo-button1">
                {formatKoreanWon(cartListItems.totalDiscountPrice ?? 0, false)}원
              </span>
            </div>
            <div className="flex flex-col gap-2 py-2">
              <div className="py-2 px-4">
                <h3>총 결제 금액</h3>
              </div>
              <div className="flex justify-end px-4 py-2">
                <span className="typo-h2 text-orange-500">
                  {formatKoreanWon(cartListItems.totalPaymentPrice ?? 0, false)}원
                </span>
              </div>
              <div className="flex justify-center px-4">
                <Button
                  variant={'secondary'}
                  size={'lg'}
                  disabled={isButtonDisabled()}
                  onClick={() => handleGuestCheckout(guestCartData)}
                >
                  구매하기
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Suspense>
  )
}
