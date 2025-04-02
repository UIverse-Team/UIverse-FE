import { createServerHttpClient } from '@/libs/axios/serverClient'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const size = searchParams.get('size')
    // 서버 HTTP 클라이언트 생성
    const serverClient = await createServerHttpClient()

    const response = await serverClient.get(`/products/specialPrices?size=${size}`)
    return NextResponse.json(response.data)
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Failed to fetch product ID' }, { status: 500 })
  }
}
