import { apiGet } from '@/libs/axios/apiMethods'
import { addQueryParams, createPathWithParams } from '@/libs/axios/endPoints'
import type { OrderDetail, OrderProduct, OrderResponse } from '@/types/orders/orderType'

export const ENDPOINTS = {
  ORDERS: '/orders',
  ORDER_BY_ID: '/orders/:id',
  ORDER_PRODUCT: '/orders/:orderDetailId/item',
  GUEST_ORDER: '/ordersGuest/:orderNumber',
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
export const getOrderDetail = async (orderId: string) => {
  // orderId 매개변수를 받아서 엔드포인트에 포함
  const endpoint = createPathWithParams(ENDPOINTS.ORDER_BY_ID, { id: orderId })

  try {
    const response = await apiGet<OrderDetail>(endpoint)
    return response.data
  } catch (error) {
    console.error(error instanceof Error ? error.message : '알 수 없는 오류')
    throw error
  }
}

/**
 * 주문 상품 조회
 */
export const getOrderProduct = async (orderDetailId: string): Promise<OrderProduct | undefined> => {
  if (!orderDetailId) return

  const endpoint = createPathWithParams(ENDPOINTS.ORDER_PRODUCT, { orderDetailId })
  try {
    const response = await apiGet<OrderProduct>(endpoint)
    return response.data
  } catch (error) {
    console.error(
      '주문 상품 조회 실패:',
      error instanceof Error ? error.message : '알 수 없는 오류',
    )
    throw error
  }
}
