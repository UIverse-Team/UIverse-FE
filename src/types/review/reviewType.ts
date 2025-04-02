export interface ReviewProduct {
  id: number
  name: string
  labels: string
  originPrice: number
  discountPrice: number
  discountRate: number
  isDiscount: boolean
  brand: string
  mainImage: string
}

export interface ReviewItem {
  tag: string
  rating: number
  content: string
  likeCount: number
  reviewCount: number
  product: ReviewProduct
  createAt: string
  option: string
}

interface CategoryReview {
  category: string
  content: ReviewItem[]
}

export type PickProductType = Pick<ReviewItem, 'product'>

export type ReviewArray = CategoryReview[]
