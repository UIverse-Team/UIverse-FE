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

  http.post('http://localhost:3000/signup/step0', async ({ request }) => {
    const userData = await request.json()
    console.log(userData)
    return HttpResponse.json({ message: '인증 성공' }, { status: 200 })
  }),

  http.post('http://localhost:3000/signup/step1', async ({ request }) => {
    const userData = await request.json()
    console.log(userData)
    return HttpResponse.json({ message: '인증 성공' }, { status: 200 })
  }),

  http.post('http://localhost:3000/signup/step2', async ({ request }) => {
    const userData = await request.json()
    console.log(userData)
    return HttpResponse.json({ message: '인증 성공' }, { status: 200 })
  }),

  http.post('http://localhost:3000/signup/last', async ({ request }) => {
    const userData = await request.json()
    console.log(userData)
    return HttpResponse.json({ message: '인증 성공' }, { status: 200 })
  }),

  http.post('http://localhost:3000/emailCertifiaction/signup/send', async ({ request }) => {
    const userData = await request.json()
    console.log(userData)
    return HttpResponse.json({ message: '인증 성공' }, { status: 200 })
  }),

  http.post('http://localhost:3000/emailCertifiaction/verify', async ({ request }) => {
    const userData = await request.json()
    console.log(userData)
    console.log(userData.code)
    if (String(userData.code) === '123456') {
      return HttpResponse.json({ message: '인증 성공' }, { status: 200 })
    }

    return HttpResponse.json({ message: '잘못된 요청' }, { status: 400 })
  }),

  http.post('http://localhost:3000/numberCertification/send', async ({ request }) => {
    const userData = await request.json()
    console.log(userData)
    return HttpResponse.json({ message: '인증 성공' }, { status: 200 })
  }),

  http.post('http://localhost:3000/numberCertification/verify', async ({ request }) => {
    const userData = await request.json()
    if (String(userData.code) === '123123') {
      return HttpResponse.json({ message: '인증 성공' }, { status: 200 })
    }

    return HttpResponse.json({ message: '잘못된 요청' }, { status: 400 })
  }),
]
