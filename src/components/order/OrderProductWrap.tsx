'use client'

import { ORDER_STATUS_LABELS, OrderDetail, OrderProduct, OrderType } from '@/types/orders/orderType'
import Button from '../common/Button/Button'
import { OrderListCard } from './OrderListCard'
import { useState } from 'react'
import ExchangeReturnModal from './ExchangeReturnModal'
import TrackingModal from './TrackingModal'

export const OrderProductWrap = ({ data }: { data: OrderDetail }) => {
  const getOrderStatusLabel = (status: OrderType) => ORDER_STATUS_LABELS[status]
  const orderStatus = Object.keys(ORDER_STATUS_LABELS).includes(data.orderStatus)
    ? (data.orderStatus as OrderType)
    : 'ORDER_CANCELED'

  const CANCELABLE_STATUSES: OrderType[] = ['PAYMENT_COMPLETED', 'PRODUCT_PREPARING']
  const TRACKABLE_STATUSES: OrderType[] = [
    'SHIPMENT_STARTED',
    'SHIPMENT_PROCESSING',
    'DELIVERED',
    'PURCHASED_CONFIRMED',
  ]
  const CANCELED_STATUSES: OrderType[] = ['ORDER_CANCELED']

  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false)
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false)

  const handleCancelOrderBtn = () => {
    console.log('주문취소')
  }

  const handleCancelDetailBtn = () => {
    console.log('취소상세')
  }

  return (
    <div className="flex flex-col gap-4">
      <span className="typo-button1">{getOrderStatusLabel(orderStatus)}</span>
      <div className="flex flex-col gap-6">
        {data.products.map((item: OrderProduct) => (
          <OrderListCard key={item.id} data={item} />
        ))}
      </div>
      {CANCELABLE_STATUSES.includes(orderStatus) && (
        <Button size="sm" variant="tertiary" onClick={handleCancelOrderBtn}>
          주문취소
        </Button>
      )}
      {CANCELED_STATUSES.includes(orderStatus) && (
        <Button size="sm" variant="outline" onClick={handleCancelDetailBtn}>
          취소상세
        </Button>
      )}
      {TRACKABLE_STATUSES.includes(orderStatus) && (
        <div className="flex gap-2">
          <Button size="sm" variant="tertiary" onClick={() => setIsReturnModalOpen(true)}>
            교환,반품 신청
          </Button>
          <ExchangeReturnModal isOpen={isReturnModalOpen} onOpenChange={setIsReturnModalOpen} />
          <Button size="sm" variant="tertiary" onClick={() => setIsTrackingModalOpen(true)}>
            배송조회
          </Button>
          <TrackingModal isOpen={isTrackingModalOpen} onOpenChange={setIsTrackingModalOpen} />
        </div>
      )}
    </div>
  )
}
