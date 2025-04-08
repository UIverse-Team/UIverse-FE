import { createServerHttpClient } from '@/libs/axios/serverClient'
import { NextRequest, NextResponse } from 'next/server'

/**
 * 비회원 장바구니 상품 조회 API
 * 클라이언트로부터 받은 상품 ID 목록을 기반으로 상품 정보를 조회합니다.
 */
export async function GET(request: NextRequest) {
  try {
    // URL 파라미터에서 상품 ID 목록 추출
    const { searchParams } = new URL(request.url)
    const saleProductIdParam = searchParams.get('saleProductId')

    try {
      const cartItems = JSON.parse(saleProductIdParam as string)
      const encoding = encodeURIComponent(JSON.stringify(cartItems))

      // 서버 HTTP 클라이언트 생성
      const serverClient = await createServerHttpClient()

      // 비회원 장바구니 상품 조회 API 호출
      const response = await serverClient.get(`carts/guest?saleProductId=${encoding}`)

      // 성공 응답 반환
      return NextResponse.json(response.data, {
        status: 200,
      })
    } catch (parseError) {
      console.error(
        '상품 ID 목록 파싱 실패:',
        parseError instanceof Error ? parseError.message : '알 수 없는 오류',
      )
      return NextResponse.json({ error: '잘못된 상품 ID 형식입니다.' }, { status: 400 })
    }
  } catch (error) {
    // 에러 발생 시 처리
    console.error(
      '비회원 장바구니 조회 실패:',
      error instanceof Error ? error.message : '알 수 없는 오류',
    )
    return NextResponse.json({ error: '장바구니 상품 조회에 실패했습니다.' }, { status: 500 })
  }
}
