import { apiGet } from '@/libs/axios/apiMethods'
import { addQueryParams } from '@/libs/axios/endPoints'
import { OrderResponse } from '@/types/orders/orderType'

export const ENDPOINTS = {
  ORDERS: '/orders',
  ORDER_BY_ID: '/orders/:id',
}

/**
 * 주문 목록 조회
 */
export const getAllOrders = async (
  period = '1month',
  page = 1,
  size = 5,
): Promise<OrderResponse> => {
  const endpoint = addQueryParams(ENDPOINTS.ORDERS, { period, page, size })
  try {
    const response = await apiGet<OrderResponse>(endpoint)

    return response.data
  } catch (error) {
    console.error(
      '주문 목록 조회 실패:',
      error instanceof Error ? error.message : '알 수 없는 오류',
    )
    throw error
  }
}
