import { createPathWithParams } from '@/libs/axios/endPoints'
import { createServerHttpClient } from '@/libs/axios/serverClient'
import type { ReviewDetail } from '@/types/review/reviewType'

const ENDPOINTS = {
  REVIEW_DETAIL: '/reviews/:reviewId/detail',
}

/**
 * 리뷰 상세 정보 조회
 */
export async function getReviewDetail(reviewId: string): Promise<ReviewDetail> {
  const endpoint = createPathWithParams(ENDPOINTS.REVIEW_DETAIL, { reviewId })
  try {
    const serverClient = createServerHttpClient()
    const response = await (await serverClient).get<ReviewDetail>(endpoint)

    return response.data
  } catch (error) {
    console.error(
      '리뷰 상세 조회 실패:',
      error instanceof Error ? error.message : '알 수 없는 오류',
    )
    throw error
  }
}
