'use client'
import Cart from '/public/icons/cart.svg?svgr'
import Card from '/public/icons/card.svg?svgr'
import CartCheck from '/public/icons/cart-check.svg?svgr'
import { usePathname, useSearchParams } from 'next/navigation'
import { ROUTES } from '@/constants/routes'

export const CartHeader = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderNumber')

  // 현재 경로에 따라 배경색 변경
  const getBgColor = (path: string) => {
    if (pathname === ROUTES.CART) return path === 'cart' ? 'bg-gray-950' : 'bg-gray-50'
    if (pathname === ROUTES.PURCHASE) return path === 'purchase' ? 'bg-gray-950' : 'bg-gray-50'
    if (pathname === ROUTES.PURCHASE_COMPLETE)
      return path === 'complete' ? 'bg-gray-950' : 'bg-gray-50'
    return 'bg-gray-50'
  }

  const getTitle = () => {
    if (pathname === ROUTES.CART) return '장바구니'
    if (pathname === ROUTES.PURCHASE) return '주문결제'
    if (pathname === ROUTES.PURCHASE_COMPLETE) return '주문이 완료되었습니다.'
  }

  return (
    <div className="flex flex-col bg-white w-full rounded-2xl items-center ">
      <h1 className="typo-h2 border-b-[1px] border-alter-line w-full text-center p-6">
        {getTitle()}
        <h1 className="typo-h3 mt-2">{orderId && '주문 번호' + ':' + orderId}</h1>
      </h1>
      <div className="flex p-6">
        <div className="flex gap-20 justify-center relative">
          {/* 장바구니 */}
          <div className="flex flex-col gap-2 items-center after:content-[''] after:border-[1px] after:inline-flex after:w-20 after:absolute after:top-8 after:left-16 after:border-[#E5E5E5]">
            <div
              className={`w-[64px] h-[64px] flex items-center justify-center ${getBgColor('cart')} flex-col rounded-md`}
            >
              <Cart className="size-9 text-alternative" />
            </div>
            <span className="typo-button2">장바구니</span>
          </div>

          {/* 주문결제 */}
          <div className="flex flex-col gap-2 items-center after:content-[''] after:border-[1px] after:inline-flex after:w-20 after:absolute after:top-8 after:right-16 after:border-[#E5E5E5]">
            <div
              className={`w-[64px] h-[64px] flex items-center justify-center ${getBgColor('purchase')} rounded-md`}
            >
              <Card />
            </div>
            <span className="typo-button2 text-alternative">주문결제</span>
          </div>

          {/* 결제 완료 */}
          <div className="flex flex-col gap-2 items-center">
            <div
              className={`w-[64px] h-[64px] flex items-center justify-center ${getBgColor('complete')} rounded-md`}
            >
              <CartCheck />
            </div>
            <span className="typo-button2 text-alternative">결제 완료</span>
          </div>
        </div>
      </div>
    </div>
  )
}
