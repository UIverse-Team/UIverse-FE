'use server'
import { CartInformation } from '@/components/cart/CartInformation'
import { CartHeader } from '@/components/cart/CartHeader'
import { CartList } from '@/components/cart/CartList'
import { CartPayForm } from '@/components/cart/CartPayForm'

export default async function CartPage() {
  return (
    <div className="flex flex-col gap-4">
      <CartHeader />
      {/* 장바구니 리스트 아이템 */}
      <main className="flex flex-row w-full gap-6 ">
        <CartList />
        {/* 주문 결제 내역 section */}
        <CartPayForm />
      </main>
      <div className="flex gap-4 flex-col">
        <CartInformation />
      </div>
    </div>
  )
}
