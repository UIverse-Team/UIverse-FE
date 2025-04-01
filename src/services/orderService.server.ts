import { addQueryParams } from '@/libs/axios/endPoints'
import { OrderResponse } from '@/types/orders/orderType'
import { ENDPOINTS } from './orderService'
import { createServerHttpClient } from '@/libs/axios/serverClient'

/**
 * 주문 목록 조회
 */
export const getAllOrders = async (
  period: string,
  page: number,
  size: number,
): Promise<OrderResponse> => {
  const endpoint = addQueryParams(ENDPOINTS.ORDERS, { period, size, page })
  try {
    const serverClient = createServerHttpClient()
    const response = await (await serverClient).get<OrderResponse>(endpoint)

    return response.data
  } catch (error) {
    console.error(
      '주문 목록 조회 실패:',
      error instanceof Error ? error.message : '알 수 없는 오류',
    )
    throw error
  }
}
