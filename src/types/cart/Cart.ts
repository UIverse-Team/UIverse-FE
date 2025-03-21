type CartDetailResponse = {
  cartId: number
  productName: string
  optionName: string
  quantity: number
  price: number
  image: string
  saleProductId: number
  brandName: string
  discountPrice: number
}

export interface CartType {
  cartDetailResponseList: CartDetailResponse[]
  totalItems: number
  totalPrice: number
  totalDiscountPrice: number
}
