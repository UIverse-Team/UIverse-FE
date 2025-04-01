import { cartStorageType } from '@/types/cart/cartType'
import { createServerHttpClient } from '@/libs/axios/serverClient'
import { NextRequest, NextResponse } from 'next/server'

// 회원 주문서에서 결제 클릭
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { address, orderDetailRequestList } = body
    const serverClient = await createServerHttpClient()

    const response = await serverClient.post(`/orders`, {
      address: address,
      orderDetailRequestList: orderDetailRequestList.map((item: cartStorageType) => ({
        saleProductId: item.id,
        quantity: item.quantity,
      })),
    })
    return NextResponse.json(response.data, { status: 200 })
  } catch (error) {
    console.error(error)
  }
}

/**
 * 주문 목록 조회 API
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const period = searchParams.get('period')
    const page = searchParams.get('page') || 0
    const size = searchParams.get('size') || 5
    // 서버 HTTP 클라이언트 생성
    const serverClient = await createServerHttpClient()

    // 주문 조회 API 호출
    const response = await serverClient.get('/orders', {
      params: {
        period,
        page,
        size,
      },
    })

    // 성공 응답 반환
    return NextResponse.json(response.data, { status: 200 })
  } catch (error) {
    // 에러 발생 시 처리
    console.error(error instanceof Error ? error.message : '알 수 없는 오류')
    return NextResponse.json({ error: '주문 조회에 실패했습니다.' }, { status: 500 })
  }
}
