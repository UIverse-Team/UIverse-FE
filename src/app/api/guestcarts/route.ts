import { CartType } from '@/types/cart/Cart'
import { NextResponse } from 'next/server'

const cartItems: CartType[] = [
  {
    cartDetailResponseList: [
      {
        cartId: 5,
        saleProductId: 1,
        productName: 'Red T-Shirt',
        optionName: 'Red Shirt',
        quantity: 13,
        price: 15000,
        image: 'https://shopping-phinf.pstatic.net/main_8611157/86111572769.2.jpg',
        brandName: '루이비통',
        discountPrice: 10000,
      },
      {
        cartId: 1,
        saleProductId: 1,
        productName: 'Red T-Shirt',
        optionName: 'Red Shirt',
        quantity: 13,
        price: 150000,
        image: 'https://shopping-phinf.pstatic.net/main_8611157/86111572769.2.jpg',
        brandName: '샤넬',
        discountPrice: 10000,
      },
    ],
    totalItems: 1,
    totalPrice: 600000,
    totalDiscountPrice: 20000,
  },
]

export async function GET() {
  // 실제 구현에서는 사용자 인증 및 데이터베이스 조회 로직이 필요합니다
  return NextResponse.json(cartItems)
}
