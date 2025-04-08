export interface RealTimeProduct {
  productId: number
  productImageUrl: string
  brand: string
  name: string
  originPrice: number
  discountPrice: number
  discountRate: number
  salesVolume: number
  reviewRating: number
}

// Keyword details interface
export interface RealTimeKeyword {
  rank: number
  keyword: string
  category: string
  products: RealTimeProduct[]
}

// Main accordion data interface
export interface RealTimeData {
  date: string
  time: string
  keywords: RealTimeKeyword[]
}
