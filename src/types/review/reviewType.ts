import { REVIEW_TAG_MAP } from '@/constants/reviewTag'
import type { AllProduct } from '../Product/productsType'

// 리뷰 태그 관련 타입
export type ReviewTagKey = keyof typeof REVIEW_TAG_MAP
export type ReviewTagName = (typeof REVIEW_TAG_MAP)[ReviewTagKey]
export interface ReviewTag {
  key: ReviewTagKey
  name: ReviewTagName
}

export interface ReviewBase {
  tag: ReviewTagKey
  rating: number
  content: string
  createAt: string
  option: string
}

// 리뷰 목록 항목 (리스트 뷰용)
export interface ReviewListItem extends ReviewBase {
  likeCount: number
  reviewCount: number
  product: AllProduct
}

// 리뷰 상세 정보 (상세 뷰용)
export interface ReviewDetail extends ReviewBase {
  likeCount: number
  images?: string[]
  isLike: boolean
  name: string // 작성자 이름
}

interface CategoryReview {
  category: string
  content: ReviewListItem[]
}

export type ReviewArray = CategoryReview[]

// 리뷰 작성 폼 타입
export interface ReviewFormValues {
  orderDetailId: number
  content: string
  tag: ReviewTagKey | ''
  rating: number
}

// 리뷰 작성 폼 타입, 이미지 포함
export interface ReviewFormData extends ReviewFormValues {
  images?: string[] | File[]
}
