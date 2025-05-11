import { createServerHttpClient } from '@/libs/axios/serverClient'
import { NextRequest, NextResponse } from 'next/server'

/**
 *
 * 실시간 급상승 키워드 api
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const keyword = body
    const serverClient = await createServerHttpClient()
    const response = await serverClient.post(`/search`, {
      keyword: keyword,
    })
    return NextResponse.json(response.data)
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Failed to fetch product ID' }, { status: 500 })
  }
}
