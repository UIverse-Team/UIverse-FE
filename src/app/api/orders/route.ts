import { CartDetailResponse } from '@/types/cart/cartType'
import { createServerHttpClient } from '@/libs/axios/serverClient'
import { NextRequest, NextResponse } from 'next/server'

// 회원 주문서에서 결제 클릭
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { address, orderDetailRequestList } = body
    const serverClient = await createServerHttpClient()

    const requestData = {
      address: address,
      orderDetailRequestList: Array.isArray(orderDetailRequestList)
        ? orderDetailRequestList.map((item: CartDetailResponse) => ({
            saleProductId: item.saleProductId,
            quantity: item.quantity,
            cartId: item.cartId,
          }))
        : [],
      // 필요에 따라 추가 정보 포함
    }

    const response = await serverClient.post(`/orders`, requestData)
    // {
    //   // address: address,
    //   orderDetailRequestList,
    //   // orderDetailRequestList: orderDetailRequestList.map((item: CartDetailResponse) => ({
    //   //   saleProductId: item.saleProductId,
    //   //   quantity: item.quantity,
    //   //   cartId: item.cartId,
    //   // })),
    // }
    return NextResponse.json(response.data, { status: 200 })
  } catch (error) {
    console.error(error)
  }
}
