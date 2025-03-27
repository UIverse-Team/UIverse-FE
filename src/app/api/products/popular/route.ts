import { NextResponse } from 'next/server'

export async function GET() {
  const allProducts = {
    content: [
      {
        id: 1,
        name: '수트케이스 슈트케이스 양복가방 가먼트백수트케이스 슈트케이스 양복가방 가먼트백수트케이스 슈트케이스 양복가방 가먼트백수트케이스 슈트케이스 양복가방 가먼트백',
        labels: 'NONE',
        originPrice: 4500,
        discountPrice: 3200,
        discountRate: 20,
        isDiscount: true,
        brand: '더웨이나인',
        mainImage: 'https://shopping-phinf.pstatic.net/main_8207483/82074834562.1.jpg',
      },
      {
        id: 521,
        name: '아라홍스 슈트케이스 양복가방 가먼트백 여행 출장 방수원단 정장보관',
        labels: 'PROMOTION',
        originPrice: 15900,
        discountPrice: 9900,
        discountRate: 20,
        isDiscount: false,
        brand: '아라홍스',
        mainImage: 'https://shopping-phinf.pstatic.net/main_8805283/88052833575.jpg',
      },
      {
        id: 503,
        name: '진브릭 슈트케이스 가먼트백 양복가방',
        labels: 'SPECIAL_PRICE',
        originPrice: 24500,
        discountPrice: 15500,
        discountRate: 20,
        isDiscount: false,
        brand: '데이텀에프',
        mainImage: 'https://shopping-phinf.pstatic.net/main_8630491/86304910135.2.jpg',
      },
      {
        id: 530,
        name: '접이식 보스턴백 정장 양복 가방 슈트케이스 의류보관 가먼트백 출장용 여행용 멀티포켓',
        labels: 'SPECIAL_PRICE',
        originPrice: 24300,
        discountPrice: 23800,
        discountRate: 30,
        isDiscount: false,
        brand: '써커스라이프2',
        mainImage: 'https://shopping-phinf.pstatic.net/main_8885553/88855530085.jpg',
      },
    ],
    page: {
      size: 12,
      number: 0,
      totalElements: 17,
      totalPages: 2,
    },
  }

  try {
    return NextResponse.json(allProducts)
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Failed to fetch product ID' }, { status: 500 })
  }
}
