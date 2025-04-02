import { createServerHttpClient } from '@/libs/axios/serverClient'
import { NextRequest, NextResponse } from 'next/server'

// 주소 추가
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { address } = body
    const serverClient = await createServerHttpClient()
    const response = await serverClient.post(`/address/add`, address)
    return NextResponse.json(response.data, { status: 200 })
  } catch (error) {
    console.error(error)
  }
}
