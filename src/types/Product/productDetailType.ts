// 기존 타입 유지
type ProductLabel = 'NONE' | 'PROMOTION' | 'SPECIAL_PRICE'

type ImageType = string[]

type ProductSizeOption = {
  saleProductId: number
  optionValue: string
  optionExtra: number
}

export type ProductOptions = {
  color: string
  sizes: ProductSizeOption[]
}

// 제품 상세 인터페이스 수정
export interface ProductDetail {
  id: number
  name: string
  description: string
  originPrice: number
  discountPrice: number
  isDiscount: boolean
  brand: string
  labels: ProductLabel
  images: ImageType
  detailImage: string
  quantity?: number
  reviewRate: number
  reviewCount: number
  option: ProductOptions[]
  isWished: boolean
  discountRate: number
}
