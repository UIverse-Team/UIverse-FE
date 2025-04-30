import { apiPost } from '@/libs/axios/apiMethods'
import { createEndpoint } from '@/libs/axios/endPoints'
import type { ReviewFormData } from '@/types/review/reviewType'

const ENDPOINTS = {
  ADD_REVIEW: '/reviews',
}

export const addReview = async (reviewFormData: ReviewFormData) => {
  const endpoint = createEndpoint(ENDPOINTS.ADD_REVIEW)
  try {
    const response = await apiPost<string>(endpoint, { ...reviewFormData })
    return response.data
  } catch (error) {
    console.error('리뷰 등록 실패:', error instanceof Error ? error.message : '알 수 없는 오류')
  }
}
