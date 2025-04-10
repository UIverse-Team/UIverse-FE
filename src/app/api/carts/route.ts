import { createServerHttpClient } from '@/libs/axios/serverClient'
import { NextRequest, NextResponse } from 'next/server'

/**
 * 장바구니 목록 조회 API
 */
export async function GET() {
  try {
    // 서버 HTTP 클라이언트 생성
    const serverClient = await createServerHttpClient()

    // 장바구니 조회 API 호출
    const response = await serverClient.get('/carts')

    // 성공 응답 반환
    return NextResponse.json(response.data, { status: 200 })
  } catch (error) {
    // 에러 발생 시 처리
    console.error('장바구니 조회 실패:', error instanceof Error ? error.message : '알 수 없는 오류')
    return NextResponse.json({ error: '장바구니 조회에 실패했습니다.' }, { status: 500 })
  }
}

/**
 * 장바구니에 상품 등록 API
 * 이미 존재하는 상품이 있다면 quantity를 기존 값과 더해서 처리
 */
export async function POST(request: NextRequest) {
  try {
    // 요청 본문 파싱
    const { saleProductId, quantity, isForced } = await request.json()

    // 서버 HTTP 클라이언트 생성
    const serverClient = await createServerHttpClient()

    // 장바구니 추가 API 호출
    const response = await serverClient.post('/carts', {
      saleProductId: saleProductId,
      quantity: quantity,
      isForced: isForced,
    })

    // 성공 응답 반환
    return NextResponse.json(response.data, { status: 200 })
  } catch (error) {
    // 에러 발생 시 처리
    console.error(
      '장바구니 상품 추가 실패:',
      error instanceof Error ? error.message : '알 수 없는 오류',
    )
    return NextResponse.json(
      { error: '장바구니에 상품을 추가하는데 실패했습니다.' },
      { status: 500 },
    )
  }
}

/**
 * 여러 장바구니 아이템 삭제 API (cartIdList 배열 처리)
 */
export async function DELETE(request: Request) {
  try {
    const body = await request.json()
    const { cartIdList } = body

    // 유효성 검사
    if (!cartIdList || !Array.isArray(cartIdList)) {
      return NextResponse.json({ error: 'cartIdList는 배열이어야 합니다.' }, { status: 400 })
    }
    const cartIds = cartIdList.map((cartId) => Number(cartId))
    // 서버 HTTP 클라이언트 생성
    const serverClient = await createServerHttpClient()

    // 장바구니 삭제 API 호출
    await serverClient.delete('/carts', {
      data: { cartIdList: cartIds },
    })

    // 성공 응답 반환
    return NextResponse.json(
      {
        message: `선택한 장바구니 상품(${cartIdList.join(', ')})이 성공적으로 삭제되었습니다.`,
      },
      { status: 200 },
    )
  } catch (error) {
    // 에러 발생 시 처리
    console.error(
      '장바구니 상품 삭제 실패:',
      error instanceof Error ? error.message : '알 수 없는 오류',
    )
    return NextResponse.json({ error: '장바구니 상품 삭제에 실패했습니다.' }, { status: 500 })
  }
}

/**
 * 장바구니 상품 수량 변경 API
 */
export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { cartId, quantity } = body

    // 서버 HTTP 클라이언트 생성
    const serverClient = await createServerHttpClient()

    // 장바구니 수량 변경 API 호출
    const response = await serverClient.put('/carts', {
      cartId: cartId,
      quantity: quantity,
    })

    // 성공 응답 반환
    return NextResponse.json(
      {
        message: `장바구니 상품(${cartId})의 수량이 ${quantity}개로 변경되었습니다.`,
        data: response.data,
      },
      { status: 200 },
    )
  } catch (error) {
    // 에러 발생 시 처리
    console.error(
      '장바구니 수량 변경 실패:',
      error instanceof Error ? error.message : '알 수 없는 오류',
    )
    return NextResponse.json({ error: '장바구니 수량 변경에 실패했습니다.' }, { status: 500 })
  }
}
