'use server'
import { CartInformation } from '@/components/cart/CartInformation'
import { CartHeader } from '@/components/cart/CartHeader'
import { CartList } from '@/components/cart/CartList'
import { CartPayForm } from '@/components/cart/CartPayForm'

export default async function CartPage() {
  const productIds = [1, 2, 3]
  let initialCartItems = []
  const user = true
  if (user) {
    initialCartItems = await fetchUserCartItems()
  } else {
    initialCartItems = await fetchGuestCartItems(productIds)
  }

  return (
    <div className="flex flex-col gap-4">
      <CartHeader />
      {/* 장바구니 리스트 아이템 */}
      <main className="flex flex-row w-full gap-6 ">
        <CartList cartListItems={initialCartItems} user={user} />
        {/* 주문 결제 내역 section */}
        <CartPayForm cartListItems={initialCartItems} />
      </main>
      <div className="flex gap-4 flex-col">
        <CartInformation />
      </div>
    </div>
  )
}

// 회원용 API 호출 함수
async function fetchUserCartItems() {
  try {
    const response = await fetch(`http://localhost:3000/api/carts`)
    return await response.json()
  } catch (error) {
    console.error('Failed to fetch user cart items:', error)
    return []
  }
}

// 비회원용 API 호출 함수
async function fetchGuestCartItems(productIds: number[]) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/carts/guest?saleProductId=${productIds.join(',')}`,
    )
    return await response.json()
  } catch (error) {
    console.error('Failed to fetch guest cart items:', error)
    return []
  }
}
