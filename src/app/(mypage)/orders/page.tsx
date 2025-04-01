import { OrderList } from '@/components/order/OrderList'
import OrderListPeriodSelect from '@/components/order/OrderListPeriodSelect'
import { QUERY_KEYS } from '@/constants/queryKeys'
import PrefetchedQueryHydrationBoundary from '@/libs/tanstackQuery/PrefetchedQueryHydrationBoundary'
import { getAllOrders } from '@/services/orderService.server'

export type Params = Promise<{ slug: string }>
export type SearchParams = Promise<{ [key: string]: string | undefined }>

const OrdersPage = async (props: { params: Params; searchParams: SearchParams }) => {
  const searchParams = await props.searchParams
  const currentPage = Number(searchParams.page) || 0
  const size = Number(searchParams.size) || 5
  const period = searchParams.period || '1month'
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex w-full items-center bg-white rounded-t-lg p-6 justify-between">
        <div className="typo-h3">최근주문내역</div>
        <OrderListPeriodSelect />
      </div>
      <PrefetchedQueryHydrationBoundary
        queryList={[
          {
            queryKey: [QUERY_KEYS.ORDERS_LIST(period, currentPage, size)],
            queryFn: () => getAllOrders(period, currentPage, size),
            staleTime: 24 * 60 * 60 * 1000, // 24시간
          },
        ]}
      >
        <OrderList period={period} currentPage={currentPage} size={size} />
      </PrefetchedQueryHydrationBoundary>
    </div>
  )
}

export default OrdersPage
