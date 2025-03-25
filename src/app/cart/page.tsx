'use client'
import { CartInformation } from '@/components/cart/CartInformation'
import { CartHeader } from '@/components/cart/CartHeader'
import { CartItemForm } from '@/components/cart/CartItemForm'

export default function CartPage() {
  return (
    <div className="flex flex-col gap-4">
      <CartHeader />
      {/* 장바구니 리스트 아이템 */}
      <main className="flex w-full gap-4 ">
        <CartItemForm />
      </main>
      <div className="flex gap-4 flex-col">
        <CartInformation />
      </div>
    </div>
  )
}
