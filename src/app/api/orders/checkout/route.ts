import { createServerHttpClient } from '@/libs/axios/serverClient'
import { NextRequest, NextResponse } from 'next/server'

// 비회원 장바구니 -> 주문서
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { transformedCart } = body

    // 서버 HTTP 클라이언트 생성
    const serverClient = await createServerHttpClient()
    const response = await serverClient.post(`/orders/checkout`, transformedCart)
    return NextResponse.json(response.data, { status: 200 })
  } catch (error) {
    console.error(error)
  }
}
