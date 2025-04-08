import OrderDetailWrap from '@/components/order/OrderDetailWrap'
import { getGuestOrder } from '@/services/orderService.server'
import { PageParams } from '@/types/params/pageParamTypes'
import React from 'react'

const QuestOrderPage = async ({
  params: detailParams,
  searchParams: detailSearchParams,
}: PageParams<'orderNumber'>) => {
  const params = await detailParams
  const orderNumber = String(params?.orderNumber)
  const searchParams = await detailSearchParams
  const phoneNumber = String(searchParams?.phone)
  const data = await getGuestOrder(orderNumber, phoneNumber)
  return <OrderDetailWrap data={data} />
}

export default QuestOrderPage
