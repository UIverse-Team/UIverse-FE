import httpClient from '@/util/httpClient'
import { NextResponse } from 'next/server'

export async function GET() {
  const response = await httpClient.get(`/carts`)

  return NextResponse.json(response.data, { status: 200 })
}

// 장바구니에 상품 등록
//이미 존재하는 상품이 있다면 quantity을 기존 값과 더해서 보내주기
export async function POST(productId: number, quantity: number) {
  try {
    const response = await httpClient.post(`/carts`, {
      saleProductId: productId,
      quantity: quantity,
    })

    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    console.error('Failed to delete cart items:', error)
    return NextResponse.json(
      {
        error: 'Failed to delete cart items',
      },
      { status: 500 },
    )
  }
}

// 여러 카트 아이템 삭제 (cartIdList 배열 처리)
export async function DELETE(request: Request) {
  try {
    const body = await request.json()
    const { cartIdList } = body
    await httpClient.delete(`/api/carts`, {
      data: { cartIdList: cartIdList },
    })

    if (!cartIdList || !Array.isArray(cartIdList)) {
      return NextResponse.json({ error: 'cartIdList must be an array' }, { status: 400 })
    }

    return NextResponse.json({
      message: `Cart items ${cartIdList.join(', ')} deleted successfully`,
    })
  } catch (error) {
    console.error('Failed to delete cart items:', error)
    return NextResponse.json({ error: 'Failed to delete cart items' }, { status: 500 })
  }
}

//장바구니 수량
export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { cartId, quantity } = body
    await httpClient.put(`/carts`, {
      cartId: cartId,
      quantity: quantity,
    })

    return NextResponse.json(
      {
        message: `Cart put items ${cartId},${quantity} deleted successfully`,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('Failed to delete cart items:', error)
    return NextResponse.json(
      {
        error: 'Failed to delete cart items',
      },
      { status: 500 },
    )
  }
}
