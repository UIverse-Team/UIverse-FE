import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const saleProductId = searchParams.get('saleProductId')

  const productIds = saleProductId ? saleProductId.split(',').map((id) => parseInt(id, 10)) : []

  console.log('GET 요청으로 받은 상품 ID 목록:', productIds)

  // 모든 상품 데이터
  const allProducts = [
    {
      cartId: 5,
      saleProductId: 1,
      productName: 'Red T-Shirt',
      optionName: 'Red Shirt',
      paymentPrice: 15000,
      orderPrice: 20000,
      discountPrice: 5000,
      quantity: 1,
      totalPrice: 15000,
      image: 'https://shopping-phinf.pstatic.net/main_8611157/86111572769.2.jpg',
      brandName: 'Brand A',
    },
    {
      cartId: 2,
      saleProductId: 2,
      productName: 'Blue Jeans',
      optionName: 'Blue Jeans',
      paymentPrice: 28000,
      orderPrice: 35000,
      discountPrice: 7000,
      quantity: 1,
      totalPrice: 28000,
      image: 'https://shopping-phinf.pstatic.net/main_8611157/86111572769.2.jpg',
      brandName: 'Brand B',
    },
    {
      cartId: 3,
      saleProductId: 3,
      productName: 'Leather Sofa',
      optionName: 'Leather Jacket',
      paymentPrice: 120000,
      orderPrice: 150000,
      discountPrice: 30000,
      quantity: 1,
      totalPrice: 120000,
      image: 'https://shopping-phinf.pstatic.net/main_8611157/86111572769.2.jpg',
      brandName: 'Brand C',
    },
  ]

  const filteredProducts =
    productIds.length > 0
      ? allProducts.filter((product) => productIds.includes(product.saleProductId))
      : allProducts

  const totalItems = filteredProducts.length
  const totalOrderPrice = filteredProducts.reduce((sum, product) => sum + product.orderPrice, 0)
  const totalDiscountPrice = filteredProducts.reduce(
    (sum, product) => sum + product.discountPrice,
    0,
  )
  const totalPaymentPrice = filteredProducts.reduce((sum, product) => sum + product.paymentPrice, 0)

  return NextResponse.json([
    {
      cartDetailResponseList: filteredProducts,
      totalItems,
      totalOrderPrice,
      totalDiscountPrice,
      totalPaymentPrice,
    },
  ])
}
