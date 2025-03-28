interface Product {
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

// Review Item Type
interface ReviewItem {
  tag: string
  rating: number
  content: string
  likeCount: number
  reviewCount: number
  product: Product
  createAt: string
  option: string
}

// Category Review Type
interface CategoryReview {
  category: string
  content: ReviewItem[]
}

export type ReviewArray = CategoryReview[]
