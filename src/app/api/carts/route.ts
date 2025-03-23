import { NextResponse } from 'next/server'

const allProducts = [
  {
    cartDetailResponseList: [
      {
        cartId: 5,
        saleProductId: 1,
        productName: 'Red T-Shirt',
        optionName: 'Red Shirt',
        paymentPrice: 15000,
        orderPrice: 20000,
        discountPrice: 5000,
        quantity: 13,
        totalPrice: 195000,
        image: 'https://shopping-phinf.pstatic.net/main_8611157/86111572769.2.jpg',
        brandName: 'Brand A',
      },
    ],
    totalItems: 1,
    totalOrderPrice: 260000,
    totalDiscountPrice: 65000,
    totalPaymentPrice: 195000,
  },
  {
    cartDetailResponseList: [
      {
        cartId: 2,
        saleProductId: 1,
        productName: 'Red T-Shirt',
        optionName: 'Red Shirt',
        paymentPrice: 15000,
        orderPrice: 20000,
        discountPrice: 5000,
        quantity: 13,
        totalPrice: 195000,
        image: 'https://shopping-phinf.pstatic.net/main_8611157/86111572769.2.jpg',
        brandName: 'Brand A',
      },
    ],
    totalItems: 1,
    totalOrderPrice: 260000,
    totalDiscountPrice: 65000,
    totalPaymentPrice: 195000,
  },
]
export async function GET() {
  return NextResponse.json(allProducts)
}

// 장바구니에 상품 등록
//이미 존재하는 상품이 있다면 quantity을 기존 값과 더해서 보내주기
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { saleProductId, quantity } = body

    let productFound = false
    allProducts.forEach((cart) => {
      const product = cart.cartDetailResponseList.find(
        (item) => item.saleProductId === saleProductId,
      )

      if (product) {
        // 상품이 있다면 quantity를 더해줌
        product.quantity += quantity
        productFound = true
      }
    })

    if (!productFound) {
      allProducts.push({
        cartDetailResponseList: [
          {
            cartId: 5,
            saleProductId: saleProductId,
            productName: 'New Product',
            optionName: 'New Option',
            paymentPrice: 15000,
            orderPrice: 20000,
            discountPrice: 5000,
            quantity: quantity,
            totalPrice: 20000 * quantity,
            image: 'https://shopping-phinf.pstatic.net/main_8611157/86111572769.2.jpg',
            brandName: 'New Brand',
          },
        ],
        totalItems: 1,
        totalOrderPrice: 20000 * quantity,
        totalDiscountPrice: 5000 * quantity,
        totalPaymentPrice: 15000 * quantity,
      })
    }

    return NextResponse.json(
      {
        message: `Cart items ${saleProductId},${quantity} deleted successfully`,
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

// 여러 카트 아이템 삭제 (cartIdList 배열 처리)
export async function DELETE(request: Request) {
  try {
    const body = await request.json()
    const { cartIdList } = body

    if (!cartIdList || !Array.isArray(cartIdList)) {
      return NextResponse.json({ error: 'cartIdList must be an array' }, { status: 400 })
    }

    return NextResponse.json(
      { message: `Cart items ${cartIdList.join(', ')} deleted successfully` },
      { status: 200 },
    )
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
