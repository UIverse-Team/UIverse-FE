import { ProductDetail } from '@/types/Product/productType'
import { NextResponse } from 'next/server'

const mockProduct: ProductDetail = {
  id: 1,
  name: '(1+1) 베이직 무지 브이넥 레이온 반팔 티셔츠 6color',
  labels: 'SPECIAL_PRICE',
  description: '(1+1) 베이직 무지 브이넥 레이온 반팔 티셔츠 6color',
  originPrice: 19000,
  discountPrice: 17100,
  isDiscount: false,
  brand: '머피',
  option: {
    RED: [
      {
        saleProductId: 21,
        size: 'S',
        extra: 500,
      },
      {
        saleProductId: 22,
        size: 'M',
        extra: 1500,
      },
      {
        saleProductId: 23,
        size: 'L',
        extra: 2500,
      },
      {
        saleProductId: 24,
        size: 'XL',
        extra: 3500,
      },
    ],
    WHITE: [
      {
        saleProductId: 13,
        size: 'S',
        extra: 0,
      },
      {
        saleProductId: 14,
        size: 'M',
        extra: 1000,
      },
      {
        saleProductId: 15,
        size: 'L',
        extra: 2000,
      },
      {
        saleProductId: 16,
        size: 'XL',
        extra: 3000,
      },
    ],
    NAVY: [
      {
        saleProductId: 17,
        size: 'S',
        extra: 0,
      },
      {
        saleProductId: 18,
        size: 'M',
        extra: 1000,
      },
      {
        saleProductId: 19,
        size: 'L',
        extra: 2000,
      },
      {
        saleProductId: 20,
        size: 'XL',
        extra: 3000,
      },
    ],
    BLACK: [
      {
        saleProductId: 9,
        size: 'S',
        extra: 0,
      },
      {
        saleProductId: 10,
        size: 'M',
        extra: 1000,
      },
      {
        saleProductId: 11,
        size: 'L',
        extra: 2000,
      },
      {
        saleProductId: 12,
        size: 'XL',
        extra: 3000,
      },
    ],
  },
  reviewCount: 0,
  reviewRate: 0.0,
  images: [
    'https://shopping-phinf.pstatic.net/main_8207483/82074834562.1.jpg',
    'https://shopping-phinf.pstatic.net/main_8207483/82074834562.1.jpg',
    'https://shopping-phinf.pstatic.net/main_8207483/82074834562.1.jpg',
    'https://shopping-phinf.pstatic.net/main_8207483/82074834562.1.jpg',
    'https://shopping-phinf.pstatic.net/main_8207483/82074834562.1.jpg',
  ],
  detailImage:
    'https://thumbnail9.coupangcdn.com/thumbnails/remote/q89/image/retail/images/283639669000235-e4bd0bcf-64f6-41fe-8791-bb96e89cf6ad.jpg',
  isWished: [],
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    console.log('Requested Product ID:', id)

    const numericId = Number(id)

    // 정확한 ID 매칭 로직 개선
    if (numericId === mockProduct.id) {
      console.log(45)
      return NextResponse.json(mockProduct)
    }
  } catch (error) {
    console.error('Error fetching product:', error)
  }
}
