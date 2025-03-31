import httpClient from '@/util/httpClient'
import { NextRequest, NextResponse } from 'next/server'

// 비회원 장바구니 -> 주문서
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { transformedCart } = body
    const response = await httpClient.post(`/orders/checkout`, transformedCart)
    return NextResponse.json(response.data, { status: 200 })
  } catch (error) {
    console.error(error)
  }
}
