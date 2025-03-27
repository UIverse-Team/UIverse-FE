import httpClient from '@/util/httpClient'
import { NextRequest, NextResponse } from 'next/server'

//비회원 장바구니 상품 조회
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const saleProductIdParam = searchParams.get('saleProductId')
  const cartItems = JSON.parse(saleProductIdParam as string)
  const encoding = encodeURIComponent(JSON.stringify(cartItems))
  console.log(encoding)
  const response = await httpClient.get(`carts/guest?saleProductId=${encoding}`)

  return NextResponse.json(response.data, {
    status: 200,
  })
}
