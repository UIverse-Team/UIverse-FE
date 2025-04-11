import { createServerHttpClient } from '@/libs/axios/serverClient'
import { NextRequest, NextResponse } from 'next/server'

/**
 * 카테고리 선택에 따른 상품 조회
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get('categoryId')

    const serverClient = await createServerHttpClient()

    const response = await serverClient.get(`categories/products?categoryId=${categoryId}`)

    // 성공 응답 반환
    return NextResponse.json(response.data, { status: 200 })
  } catch (error) {
    // 에러 발생 시 처리
    console.error(
      '카테고리 상품 조회 실패',
      error instanceof Error ? error.message : '알 수 없는 오류',
    )
    return NextResponse.json({ error: '카테고리 상품 조회 실패.' }, { status: 500 })
  }
}
