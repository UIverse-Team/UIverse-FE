import { getOrderDetail } from '@/services/orderService.server'
import { PageParams } from '@/types/params/pageParamTypes'
import OrderDetailWrap from '@/components/order/OrderDetailWrap'

const OrderDetailPage = async ({ params: detailParams }: PageParams<'orderNumber'>) => {
  const params = await detailParams
  const orderNumber = String(params?.orderNumber)
  const data = await getOrderDetail(orderNumber)

  return <OrderDetailWrap data={data} />
}

export default OrderDetailPage
