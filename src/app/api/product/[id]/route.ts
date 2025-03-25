import { Product } from '@/types/Product/productType'
import { NextRequest, NextResponse } from 'next/server'

const mockProduct: Product = {
  id: 1,
  name: '한소품 안티스키밍 자개 여권 케이스 커버 여행용 여권 지갑 캐리어 네임택',
  labels: 'NONE',
  description: '한소품 안티스키밍 자개 여권 케이스 커버 여행용 여권 지갑 캐리어 네임택',
  originPrice: 31000,
  discountPrice: 27900,
  isDiscount: true,
  brand: '한소품 공식몰',
  images: [
    'https://shopping-phinf.pstatic.net/main_8611157/86111572769.2.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7LpapIl8DITfz4_Y2z7pqs7FknPkjReAZCg&s',
    'https://shopping-phinf.pstatic.net/main_8611157/86111572769.2.jpg',
    'https://shopping-phinf.pstatic.net/main_8611157/86111572769.2.jpg',
  ],
  detailImage: 'https://shopping-phinf.pstatic.net/main_8611157/86111572769.2.jpg',
  reviewRate: 5,
  reviewCount: 2183,
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const productId = Number(params.id)

  if (mockProduct.id === productId) {
    return NextResponse.json(mockProduct)
  } else {
    return NextResponse.json({ error: '상품을 찾을 수 없습니다.' }, { status: 404 })
  }
}
