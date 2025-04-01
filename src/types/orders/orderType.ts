export const ORDER_STATUS_LABELS = {
  PAYMENT_COMPLETED: '결제완료',
  PRODUCT_PREPARING: '상품준비중',
  SHIPMENT_STARTED: '배송시작',
  SHIPMENT_PROCESSING: '배송중',
  DELIVERED: '배송완료',
  ORDER_CANCELED: '취소완료',
  PURCHASED_CONFIRMED: '구매확정',
} as const

export type OrderType = keyof typeof ORDER_STATUS_LABELS

export type OrderProduct = {
  id: number
  saleProductId: number
  productName: string
  optionValue: string
  paymentPrice: number
  mainImage: string
  orderPrice: number
  discountPrice: number
  quantity: number
  totalPrice: number
  canReview: boolean
  brandName: string
}

export type Order = {
  id: number
  orderNumber: string
  orderProducts: OrderProduct[]
  orderStatus: OrderType
  totalPrice: number
  createdAt: string
  totalQuantity: number
}

export interface OrderResponse {
  totalElements: number
  totalPages: number
  size: number
  content: Order[]
  number: number
  first: boolean
  last: boolean
  empty: boolean
}

export interface OrderParams {
  period: string
  page: number
  size: number
}
