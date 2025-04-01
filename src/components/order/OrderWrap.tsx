'use client'

import { ORDER_STATUS_LABELS, Order, OrderProduct, OrderType } from '@/types/orders/orderType'
import Button from '../common/Button/Button'
import TextButton from '../common/Button/TextButton'
import Divider from '../common/Divider/Divider'
import { OrderListCard } from './OrderListCard'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/constants/routes'
import ExchangeReturnModal from './ExchangeReturnModal'
import TrackingModal from './TrackingModal'
import WriteReviewModal from './WriteReviewModal'

export const OrderWrap = ({ data }: { data: Order }) => {
  const router = useRouter()

  const getOrderStatusLabel = (status: OrderType) => ORDER_STATUS_LABELS[status]
  const orderStatus = Object.keys(ORDER_STATUS_LABELS).includes(data.orderStatus)
    ? (data.orderStatus as OrderType)
    : 'ORDER_CANCELED'

  const CANCELABLE_STATUSES: OrderType[] = ['PAYMENT_COMPLETED', 'PRODUCT_PREPARING']
  const TRACKABLE_STATUSES: OrderType[] = ['SHIPMENT_STARTED', 'SHIPMENT_PROCESSING', 'DELIVERED']
  const CONFIRMED_STATUSES: OrderType[] = ['PURCHASED_CONFIRMED']
  const CANCELED_STATUSES: OrderType[] = ['ORDER_CANCELED']

  const formatDate = (isoString: string): string => {
    return new Date(isoString).toLocaleDateString('ko-KR').replace(/ /g, '')
  }

  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false)
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false)
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)

  const handleCancelOrderBtn = () => {
    console.log('주문취소')
  }

  const handleCancelDetailBtn = () => {
    console.log('취소상세')
  }

  return (
    <div className="w-full bg-white pt-6">
      <div className="flex justify-between px-6 mb-4 items-center">
        <span className="typo-button1">{formatDate(data.createdAt)}</span>
        <TextButton
          size="sm"
          iconPosition="right"
          onClick={() => router.push(`${ROUTES.ORDERS}/${data.id}`)}
        >
          상세보기
        </TextButton>
      </div>
      <Divider />
      <div className="flex flex-col gap-4 p-6">
        <span className="typo-button1">{getOrderStatusLabel(orderStatus)}</span>
        <div className="flex flex-col gap-6">
          {data.orderProducts.map((item: OrderProduct) => (
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
        {CONFIRMED_STATUSES.includes(orderStatus) && (
          <div className="flex gap-2">
            <Button size="sm" variant="tertiary" onClick={() => setIsReturnModalOpen(true)}>
              교환,반품 신청
            </Button>
            <ExchangeReturnModal isOpen={isReturnModalOpen} onOpenChange={setIsReturnModalOpen} />
            <Button size="sm" variant="tertiary" onClick={() => setIsTrackingModalOpen(true)}>
              배송조회
            </Button>
            <TrackingModal isOpen={isTrackingModalOpen} onOpenChange={setIsTrackingModalOpen} />
            <Button size="sm" variant="secondary" onClick={() => setIsReviewModalOpen(true)}>
              리뷰 작성
            </Button>
            <WriteReviewModal
              isOpen={isReviewModalOpen}
              onOpenChange={setIsReviewModalOpen}
              data={data.orderProducts}
              orderDate={data.createdAt}
            />
          </div>
        )}
      </div>
    </div>
  )
}
