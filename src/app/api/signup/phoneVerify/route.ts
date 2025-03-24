import HttpClient from '@/util/httpClient'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.json({ error: 'code 값이 없습니다.' }, { status: 400 })
  }

  const data = await HttpClient.post(`/numberCertification/verify`, {
    code,
  })

  return NextResponse.json({ data })
}
