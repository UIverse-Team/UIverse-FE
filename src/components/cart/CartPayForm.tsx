'use client'
import Button from '@/components/common/Button/Button'
import { guestPurchase } from '@/services/cartService'
import { cartStorageType, CartType } from '@/types/cart/cartType'
import formatKoreanWon from '@/util/formatKoreanWon'

interface CartPayFormProps {
  cartListItems: CartType
  getGuestCart: cartStorageType[]
}

export const CartPayForm = ({ cartListItems, getGuestCart }: CartPayFormProps) => {
  const handleGuestCheckout = async (getGuestCart: cartStorageType[]) => {
    try {
      const response = await guestPurchase(getGuestCart)
      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <section className="flex rounded-2xl flex-col gap-4 h-[363px] bg-white py-4 shrink-0 basis-[256px]">
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
                  disabled={cartListItems.totalPaymentPrice === 0}
                  onClick={() => handleGuestCheckout(getGuestCart)}
                >
                  구매하기
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
