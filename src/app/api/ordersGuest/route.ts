import { cartStorageType } from '@/types/cart/cartType'
import httpClient from '@/util/httpClient'
import { NextRequest, NextResponse } from 'next/server'

// 비회원 장바구니 등록
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { address, orderDetailRequestList } = body

    const response = await httpClient.post(`/ordersGuest`, {
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
