// 제품 라벨 타입 정의
type ProductLabel = 'NONE' | 'PROMOTION' | 'SPECIAL_PRICE'

// 개별 제품 항목 인터페이스
export interface AllProduct {
  id: number
  name: string
  labels: ProductLabel
  originPrice: number
  discountPrice: number
  isDiscount: boolean
  brand: string
  mainImage: string
  discountRate: number //할인율
}

// 페이지네이션 정보 인터페이스
interface Page {
  size: number
  number: number
  totalElements: number
  totalPages: number
}

// 제품 응답 인터페이스
export interface ProductResponse {
  content: AllProduct[]
  page: Page
}

export type ProductListResponse = Pick<ProductResponse, 'content'>

// 전체 제품 목록 타입
export type AllProductsType = ProductResponse[]
