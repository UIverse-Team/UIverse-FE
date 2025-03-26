'use client'
import Button from '@/components/common/Button/Button'
import { CartType } from '@/types/cart/cartType'
import formatKoreanWon from '@/util/formatKoreanWon'

interface CartPayFormProps {
  cartListItems: CartType[]
}

export const CartPayForm = ({ cartListItems }: CartPayFormProps) => {
  return (
    <section className="basis-[244px]  bg-white flex rounded-2xl flex-col gap-4 h-[395px]">
      {cartListItems.map((cart) => (
        <>
          <div className="flex justify-between w-full flex-col items-center">
            <h2 className="typo-h3 flex w-full border-b-[1px] border-gray-75 pb-4 p-4">주문금액</h2>
            <div className="flex flex-col">
              <div className="flex justify-between border-b-[1px] p-3 border-gray-75 typo-body3">
                <h3 className="typo-body3">총 주문 금액</h3>
                <span className="typo-button1">
                  {formatKoreanWon(cart.totalOrderPrice, false)}원
                </span>
              </div>
              <div className="flex justify-between border-b-[1px] p-3 border-gray-75">
                <h3 className="typo-body3">배송비</h3>
                <span className="typo-button1">0원</span>
              </div>
              <div className="flex justify-between border-b-[1px] p-3  border-gray-75">
                <h3 className="typo-body3">할인금액</h3>
                <span className="typo-button1">
                  {formatKoreanWon(cart.totalDiscountPrice, false)}원
                </span>
              </div>
              <div className="flex flex-col gap-6 p-3 ">
                <div>
                  <h3>총 결제 금액</h3>
                </div>
                <div className="flex justify-end">
                  <span className="typo-h2 text-orange-500">
                    {formatKoreanWon(cart.totalPaymentPrice, false)}원
                  </span>
                </div>
                <div className="flex justify-center w-[227px]">
                  <Button variant={'secondary'} size={'lg'}>
                    구매하기
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      ))}
    </section>
  )
}
