import httpClient from '@/util/httpClient'
import { AxiosError } from 'axios'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { code }: { code: string } = await request.json()

    if (!code) {
      return NextResponse.json({ error: '코드값이 필요합니다.' }, { status: 400 })
    }

    const { data } = await httpClient.post(
      `/emailCertification/verify`,
      {
        code,
      },
      { withCredentials: true },
    )

    return NextResponse.json({ data })
  } catch (error: unknown) {
    console.error('API 요청 중 오류 발생:', error)

    if (error instanceof AxiosError) {
      return NextResponse.json(
        { error: error.response?.data || '백엔드 API 요청 실패' },
        { status: error.response?.status || 500 },
      )
    }

    return NextResponse.json({ error: '서버 오류 발생' }, { status: 500 })
  }
}
