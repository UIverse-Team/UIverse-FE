import { getOrderDetail } from '@/services/orderService.server'
import { PageParams } from '@/types/params/pageParamTypes'
import OrderDetailWrap from '@/components/order/OrderDetailWrap'

const OrderDetailPage = async ({ params: detailParams }: PageParams) => {
  const params = await detailParams
  const orderId = String(params?.id)
  const data = await getOrderDetail(orderId)

  return <OrderDetailWrap data={data} />
}

export default OrderDetailPage
