import { addQueryParams, createPathWithParams } from '@/libs/axios/endPoints'
import { OrderDetail, OrderResponse } from '@/types/orders/orderType'
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

/**
 * 주문 상세 조회
 */
export const getOrderDetail = async (orderNumber: string): Promise<OrderDetail> => {
  const endpoint = createPathWithParams(ENDPOINTS.ORDER_BY_ID, { orderNumber })
  try {
    const serverClient = createServerHttpClient()
    const response = await (await serverClient).get<OrderDetail>(endpoint)

    return response.data
  } catch (error) {
    console.error(
      '주문 상세 조회 실패:',
      error instanceof Error ? error.message : '알 수 없는 오류',
    )
    throw error
  }
}

/**
 * 비회원 주문 조회
 */
export const getGuestOrder = async (orderNumber: string, phone: string): Promise<OrderDetail> => {
  const preEndpoint = createPathWithParams(ENDPOINTS.GUEST_ORDER, { orderNumber })
  const endpoint = addQueryParams(preEndpoint, { phone })
  try {
    const serverClient = createServerHttpClient()
    const response = await (await serverClient).get<OrderDetail>(endpoint)

    return response.data
  } catch (error) {
    console.error(
      '주문 상세 조회 실패:',
      error instanceof Error ? error.message : '알 수 없는 오류',
    )
    throw error
  }
}
