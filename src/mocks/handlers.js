import { http, HttpResponse } from 'msw'

const mock = {
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

const cartMock = [
  {
    cartDetailResponseList: [
      {
        id: 1,
        productName: 'Green Skirt',
        optionName: '0',
        quantity: 5,
        price: 120000,
        image: 'main_image10.jpg',
      },
      {
        id: 2,
        productName: 'Green2',
        optionName: '1',
        quantity: 5,
        price: 120000,
        image: 'main_image10.jpg',
      },
      {
        id: 3,
        productName: 'Green3',
        optionName: '2',
        quantity: 5,
        price: 120000,
        image: 'main_image10.jpg',
      },
      {
        id: 4,
        productName: 'Green4',
        optionName: '3',
        quantity: 5,
        price: 120000,
        image: 'main_image10.jpg',
      },
    ],
    totalItems: 1,
    totalPrice: 600000,
  },
]

export const handlers = [
  http.get(`http://localhost:3000/product/1`, () => {
    return HttpResponse.json(mock)
  }),
  http.get(`http://localhost:3000/guestcarts`, () => {
    return HttpResponse.json(cartMock)
  }),
  http.delete('http://localhost:3000/guestcarts/:id', ({ params }) => {
    const { id } = params
    console.log(id)
    if (id) {
      return new HttpResponse(null, { status: 404 })
    }
    return HttpResponse.json({ status: 200 })
  }),
]
