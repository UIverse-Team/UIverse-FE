import { NextRequest, NextResponse } from 'next/server'
import { createServerHttpClient } from '@/libs/axios/serverClient'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { address, getGuestCart } = body
    // getGuestCart에서 첫 번째 항목만 가져오기
    const { id, quantity } = getGuestCart[0]

    // 서버 HTTP 클라이언트 생성
    const serverClient = await createServerHttpClient()

    // 요청을 보내는 부분
    const response = await serverClient.post(`/ordersGuest/instant`, {
      address: address, // 주소 정보
      saleProductId: id, // saleProductId로 id 값 사용
      quantity: quantity, // quantity 값 그대로 사용
    })

    return NextResponse.json(response.data, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
