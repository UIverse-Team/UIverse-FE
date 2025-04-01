import { getOrderDetail } from '@/services/orderService.server'
import { PageParams } from '@/types/params/pageParamTypes'
import OrderDetailWrap from '@/components/order/OrderDetailWrap'

export const OrderDetailPage = async ({ params: detailParams }: PageParams) => {
  const params = await detailParams
  const id = Number(params?.id)
  const data = await getOrderDetail(id)

  return <OrderDetailWrap data={data} />
}

export default OrderDetailPage
