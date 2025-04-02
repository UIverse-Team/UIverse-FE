import { createServerHttpClient } from '@/libs/axios/serverClient'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { address, saleProductId, quantity } = body
    // getGuestCart에서 첫 번째 항목만 가져오기

    const serverClinet = await createServerHttpClient()
    // 요청을 보내는 부분
    const response = await serverClinet.post(`/orders/instant`, {
      address: address,
      saleProductId: saleProductId,
      quantity: quantity,
    })

    return NextResponse.json(response.data, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
