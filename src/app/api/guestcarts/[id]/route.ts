import { NextResponse } from 'next/server'

let cartItems = [
  { id: 1, name: '상품 1', price: 10000, quantity: 1 },
  { id: 2, name: '상품 2', price: 20000, quantity: 2 },
]

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const productId = Number(params.id)

  cartItems = cartItems.filter((item) => item.id !== productId)

  return NextResponse.json({ success: true, message: '상품이 장바구니에서 삭제되었습니다.' })
}
