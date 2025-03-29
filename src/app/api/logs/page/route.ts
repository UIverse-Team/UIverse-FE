import { NextRequest, NextResponse } from 'next/server'
import logHttpClient from '@/util/logHttpClient'

export async function POST(request: NextRequest) {
  try {
    const reqParams = await request.json()

    const { data } = await logHttpClient.post(`/page`, reqParams)

    return NextResponse.json({ logId: data })
  } catch (error) {
    console.error('Failed to log page view: ', error)
    return NextResponse.json(
      {
        message: '페이지 방문 로그 전송 실패',
      },
      { status: 200 },
    )
  }
}
