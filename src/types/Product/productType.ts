type labels = '#프로모션' | '#초특가' | 'NONE'
type discount_status = '오늘의특가'
export type categoryList = []
type imageType = string[]

export interface Product {
  id: number
  category_id: number
  mail_seq: number
  name: string
  description: string
  originPrice: number
  discountPrice: number
  manufaceture_date: string
  secret: boolean
  sale_status: string
  discount_status: discount_status
  isDiscount: boolean
  brand: string
  wish_list_count: string
  labels: labels
  images: imageType
  detailImage: string
  product_view_count: number
  sales: number
  quantity?: number
  reviewRate: number
  reviewCount: number
}
