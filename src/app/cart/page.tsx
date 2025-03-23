'use server'
import { CartInformation } from '@/components/cart/CartInformation'
import { CartHeader } from '@/components/cart/CartHeader'
import { CartList } from '@/components/cart/CartList'
import { CartPayForm } from '@/components/cart/CartPayForm'

export default async function CartPage() {
  const productIds = [1, 2, 3]

  //비회원일 때(임시)
  //회원일 때와 비회원일때를 관리하기 위한 수단이 필요함.
  //현재는 비회원일때 불러오는 임시 api 사용
  const data = await fetch(
    `http://localhost:3000/api/carts/guest?saleProductId=${productIds.join(',')}`,
  )
  const cartListItems = await data.json()
  return (
    <div className="flex flex-col gap-4">
      <CartHeader />
      {/* 장바구니 리스트 아이템 */}
      <main className="flex flex-row w-full gap-6 ">
        <CartList cartListItems={cartListItems} />
        {/* 주문 결제 내역 section */}
        <CartPayForm cartListItems={cartListItems} />
      </main>
      <div className="flex gap-4 flex-col">
        <CartInformation />
      </div>
    </div>
  )
}
