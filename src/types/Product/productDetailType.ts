// 기존 타입 유지
type ProductLabel = 'NONE' | 'PROMOTION' | 'SPECIAL_PRICE'

type ImageType = string[]

// 옵션 아이템의 기본 인터페이스
interface BaseOptionItem {
  saleProductId: number
  extra: number
}

// 옵션 타입 인터페이스 (유연한 구조)
interface OptionItem extends BaseOptionItem {
  [key: string]: string | number
}

// 제네릭 옵션 타입
type ProductOptions = {
  [key: string]: OptionItem[]
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
  option: ProductOptions
  isWished: string[] | boolean
  discountRate: number
}
