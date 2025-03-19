import { http, HttpResponse } from 'msw'

const mock = {
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

export const handlers = [
  http.get(`http://localhost:3000/product/1`, () => {
    return HttpResponse.json(mock)
  }),
]
