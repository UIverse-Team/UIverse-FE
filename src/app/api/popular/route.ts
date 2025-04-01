import { createServerHttpClient } from '@/libs/axios/serverClient'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // 서버 HTTP 클라이언트 생성
    const serverClient = await createServerHttpClient()

    // 장바구니 조회 API 호출
    const response = await serverClient.get('/popular')

    // 성공 응답 반환
    return NextResponse.json(response.data, { status: 200 })
  } catch (error) {
    // 에러 발생 시 처리
    console.error('장바구니 조회 실패:', error instanceof Error ? error.message : '알 수 없는 오류')
    return NextResponse.json({ error: '장바구니 조회에 실패했습니다.' }, { status: 500 })
  }
}
