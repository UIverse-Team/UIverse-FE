import { NextRequest, NextResponse } from 'next/server'
import { createServerHttpClient } from '@/libs/axios/serverClient'
import { cartStorageType } from '@/types/cart/cartType'

// 비회원 주문 페이지에서 클릭
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { address, orderDetailRequestList } = body

    // 서버 HTTP 클라이언트 생성
    const serverClient = await createServerHttpClient()
    console.log(address, orderDetailRequestList)
    const response = await serverClient.post(`/ordersGuest`, {
      address: address,
      orderDetailRequestList: orderDetailRequestList.map((item: cartStorageType) => ({
        saleProductId: item.id,
        quantity: item.quantity,
      })),
    })
    return NextResponse.json(response.data, { status: 200 })
  } catch (error) {
    console.error(error)
  }
}
