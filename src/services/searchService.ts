import { apiPost } from '@/libs/axios/apiMethods'
import { createEndpoint } from '@/libs/axios/endPoints'

const ENDPOINTS = {
  SEARCH: '/search',
}

/**
 * 실시간 급상승 관련 키워드
 */
export const getREALTIMEKEYWORD = async (keyword: string) => {
  const endpoint = createEndpoint(ENDPOINTS.SEARCH)
  try {
    const response = await apiPost(endpoint, keyword)
    return response.data
  } catch (error) {
    console.error(
      '인기 상품 조회 실패:',
      error instanceof Error ? error.message : '알 수 없는 오류',
    )
    throw error
  }
}
