import { createServerHttpClient } from '@/libs/axios/serverClient'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const orderNumber = searchParams.get('orderNumber')

    const serverClient = await createServerHttpClient()

    const response = await serverClient.get(`/orders/${orderNumber}`)

    return NextResponse.json(response.data)
  } catch (error) {
    console.error('주문 조회 중 오류 발생:', error)
    return NextResponse.json({ error: '주문 조회 중 오류가 발생했습니다.' }, { status: 500 })
  }
}
