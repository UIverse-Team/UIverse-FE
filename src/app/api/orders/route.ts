import { cartStorageType } from '@/types/cart/cartType'
import httpClient from '@/util/httpClient'
import { NextRequest, NextResponse } from 'next/server'

// 회원 주문서에서 결제 클릭
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { address, orderDetailRequestList } = body

    const response = await httpClient.post(`/orders`, {
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
