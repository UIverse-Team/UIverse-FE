import { NextRequest, NextResponse } from 'next/server'
import logHttpClient from '@/util/logHttpClient'

export async function POST(request: NextRequest) {
  try {
    // request.clone().text()를 사용해 요청 본문 확인
    const text = await request.clone().text()

    // 빈 본문 체크
    if (!text || text.trim() === '') {
      return NextResponse.json({ error: '요청 본문이 비어있습니다.' }, { status: 400 })
    }

    // 본문이 있는 경우에만 JSON 파싱 시도
    const reqParams = JSON.parse(text)

    await logHttpClient.post(`/product/click`, reqParams)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to log product click: ', error)
    return NextResponse.json(
      {
        message: '상품 클릭 로그 전송 실패',
      },
      { status: 200 },
    )
  }
}
