'use client'
import Cart from '/public/icons/cart.svg?svgr'
import Card from '/public/icons/card.svg?svgr'
import CartCheck from '/public/icons/cart-check.svg?svgr'

export const CartHeader = () => {
  return (
    <div className="flex flex-col bg-white h-[219px] w-full rounded-2xl items-center">
      <h1 className="typo-h2 border-b-[1px] border-alter-line w-full text-center p-6 ">장바구니</h1>
      <div className="flex p-6">
        <div className="flex gap-20 justify-center relative">
          <div className="flex flex-col gap-2 items-center after:content-[''] after:border-[1px] after:inline-flex after:w-20 after:absolute after:top-8 after:left-16 after:border-[#E5E5E5]">
            <div className="w-[64px] h-[64px] flex items-center justify-center bg-gray-950 flex-col rounded-md ">
              <Cart className="size-9 text-white" />
            </div>
            <span className="typo-button2">장바구니</span>
          </div>
          <div className="flex flex-col gap-2 items-center after:content-[''] after:border-[1px] after:inline-flex after:w-20 after:absolute after:top-8 after:right-16 after:border-[#E5E5E5]">
            <div className="w-[64px] h-[64px] flex items-center justify-center bg-gray-50 rounded-md">
              <Card />
            </div>
            <span className="typo-button2 text-alternative">주문결제</span>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <div className="w-[64px] h-[64px] flex items-center justify-center bg-gray-50 rounded-md">
              <CartCheck />
            </div>
            <span className="typo-button2 text-alternative">결제 완료</span>
          </div>
        </div>
      </div>
    </div>
  )
}
