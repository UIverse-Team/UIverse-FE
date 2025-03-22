export type cartStroageType = {
  id: string
  quantity: number
}
export type CartDetailResponse = {
  cartId: number
  productName: string
  optionName: string
  quantity: number
  orderPrice: number // 상품가격
  image: string
  saleProductId: number
  brandName: string
  paymentPrice: number // 결제 금액
  discountPrice: number // 할인 가격
}

export interface CartType {
  cartDetailResponseList: CartDetailResponse[]
  totalItems: number
  totalOrderPrice: number //총 상품 가격
  totalDiscountPrice: number // 총 할인 가격
  totalPaymentPrice: number // 최종 결제 금액
}
