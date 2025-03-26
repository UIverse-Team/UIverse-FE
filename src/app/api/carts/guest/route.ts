import { cartStorageType } from '@/types/cart/cartType'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const saleProductIdParam = searchParams.get('saleProductId')
  const cartItems = JSON.parse(saleProductIdParam as string)

  const allProducts = [
    {
      cartId: 1,
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
      orderPrice: 350000,
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

  const filteredProducts = allProducts.filter((product) => {
    const cartItem = cartItems.find(
      (item: cartStorageType) => String(item.id) === String(product.saleProductId),
    )
    if (cartItem) {
      product.quantity = cartItem.quantity
      return true // 필터링 조건 만족
    }
    return false // 일치하는 아이템이 없으면 필터링되지 않음
  })
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
