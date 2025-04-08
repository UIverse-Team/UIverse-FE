'use client'

import { QUERY_KEYS } from '@/constants/queryKeys'
import { OrderWrap } from './OrderWrap'
import { getAllOrders } from '@/services/orderService'
import LoadingSpinner from '../common/Loading/LoadingSpinner'
import useFetchData from '@/hooks/useFetchData'
import Pagination from '../common/pagination/Pagination'
import { OrderResponse } from '@/types/orders/orderType'

interface OrderListProps {
  period: string
  currentPage: number
  size: number
}

export const OrderList = ({ period, currentPage, size }: OrderListProps) => {
  const { data, isLoading } = useFetchData<OrderResponse>(
    QUERY_KEYS.ORDERS_LIST(period, currentPage, size),
    () => getAllOrders(period, currentPage, size),
  )

  if (isLoading) return <LoadingSpinner />

  if (data?.content.length === 0) {
    return <div>주문 내역이 없습니다.</div>
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        {data?.content.map((item) => <OrderWrap key={item.id} data={item} />)}
      </div>
      <div className="w-full bg-white rounded-b-lg py-2">
        <Pagination currentPage={currentPage} totalPages={data?.totalPages || 1} limit={size} />
      </div>
    </>
  )
}
