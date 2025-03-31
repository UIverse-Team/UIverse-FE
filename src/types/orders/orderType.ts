type OrderProduct = {
  id: number
  saleProductId: number
  productName: string
  optionValue: string
  paymentPrice: number
  orderPrice: number
  discountPrice: number
  quantity: number
  totalPrice: number
  canReview: boolean
  brandName: string
}

type OrderStatus =
  | 'ORDER_RECEIVED'
  | 'ORDER_PROCESSING'
  | 'ORDER_SHIPPED'
  | 'ORDER_DELIVERED'
  | 'ORDER_CANCELED' // 추가적인 상태가 있다면 확장 가능

export type Order = {
  id: number
  orderNumber: string
  orderProducts: OrderProduct[]
  orderStatus: OrderStatus
  totalPrice: number
  createdAt: string // ISO 형식 날짜 문자열
  totalQuantity: number
}
