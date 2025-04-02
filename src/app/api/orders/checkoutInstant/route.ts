import { createServerHttpClient } from '@/libs/axios/serverClient'
import { NextRequest, NextResponse } from 'next/server'

/**
 * 상품 상세 페이지에서 바로 구매 클릭
 */
export async function GET(request: NextRequest) {
  try {
    // 요청 본문 파싱
    const { searchParams } = new URL(request.url)
    const productId = searchParams.get('saleProductId')
    const quantity = searchParams.get('quantity')

    const serverClient = await createServerHttpClient()

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
