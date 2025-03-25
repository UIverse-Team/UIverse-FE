import httpClient from '@/util/httpClient'
import { AxiosError } from 'axios'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email, password }: { email: string; password: string } = await request.json()

    if (!email) {
      return NextResponse.json({ error: '이메일이 필요합니다.' }, { status: 400 })
    }

    if (!password) {
      return NextResponse.json({ error: '비밀번호가 필요합니다.' }, { status: 400 })
    }

    const { data } = await httpClient.post(`/auth/signin`, {
      loginId: email,
      password: password,
    })

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
