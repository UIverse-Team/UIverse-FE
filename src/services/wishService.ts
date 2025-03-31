import { apiPost } from '@/libs/axios/apiMethods'

// 위시리스트 토글 응답 타입
export interface WishlistToggleResponse {
  success: boolean
  data: {
    isWished: boolean
  }
  message?: string
}

/**
 * 위시리스트 추가
 */
export const addToWishlist = async (productId: number): Promise<WishlistToggleResponse> => {
  const response = await apiPost<WishlistToggleResponse>('/productwishlist/add', { productId })
  return response.data
}
