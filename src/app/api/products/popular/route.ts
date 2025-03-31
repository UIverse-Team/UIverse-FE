import { createServerHttpClient } from '@/libs/axios/serverClient'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // 서버 HTTP 클라이언트 생성
    const serverClient = await createServerHttpClient()

    const response = await serverClient.get(`/products/popular`)
    return NextResponse.json(response.data)
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Failed to fetch product ID' }, { status: 500 })
  }
}
