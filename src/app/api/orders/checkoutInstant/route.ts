import { createServerHttpClient } from '@/libs/axios/serverClient'
import { NextRequest, NextResponse } from 'next/server'

/**
 * 상품 상세 페이지에서 바로 구매 클릭
 */
export async function POST(request: NextRequest) {
  try {
    // 요청 본문 파싱
    const { productId, quantity } = await request.json()

    // 서버 HTTP 클라이언트 생성
    const serverClient = await createServerHttpClient()

    // 장바구니 추가 API 호출
    const response = await serverClient.get(
      `/orders/checkoutInstant?saleProductId=${productId}&quantity=${quantity}`,
    )

    // 성공 응답 반환
    return NextResponse.json(response.data, { status: 200 })
  } catch (error) {
    // 에러 발생 시 처리
    console.error('바로 구매 실패', error instanceof Error ? error.message : '알 수 없는 오류')
    return NextResponse.json(
      { error: '장바구니에 상품을 추가하는데 실패했습니다.' },
      { status: 500 },
    )
  }
}
