import React from 'react'
import { ORDER_STATUS_LABELS, OrderDetail, OrderType } from '@/types/orders/orderType'
import Divider from '../common/Divider/Divider'
import { OrderProductWrap } from './OrderProductWrap'
import { formatPhoneNumber } from '@/util/formatPhoneNumber'
import formatKoreanWon from '@/util/formatKoreanWon'
import { formatTimestamp } from '@/util/dateUtils'
import ChevronIconfrom from '/public/icons/chevron.svg?svgr'

const OrderDetailWrap = ({ data }: { data: OrderDetail }) => {
  const checkOrderStatus = (status: string) => {
    return ORDER_STATUS_LABELS[data.orderStatus as OrderType] === status
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex w-full bg-white rounded-t-lg p-6">
        <div className="flex flex-col gap-1">
          <p className="typo-caption1">{formatTimestamp(data.createdAt)}</p>
          <div className="typo-h3">주문번호 {data.orderNumber}</div>
        </div>
      </div>
      {/* 주문상품 */}
      <div className="flex items-center w-full p-4 text-center bg-white justify-around text-assistive">
        <div
          className={`w-33 p-2.5 typo-button2 ${checkOrderStatus('결제완료') ? 'text-primary' : ''}`}
        >
          결제완료
        </div>
        <ChevronIconfrom className="w-[18px]" />
        <div
          className={`w-33 p-2.5 typo-button2 ${checkOrderStatus('상품준비중') ? 'text-primary' : ''}`}
        >
          상품준비중
        </div>
        <ChevronIconfrom className="w-[18px]" />
        <div
          className={`w-33 p-2.5 typo-button2 ${checkOrderStatus('배송시작') ? 'text-primary' : ''}`}
        >
          배송시작
        </div>
        <ChevronIconfrom className="w-[18px]" />
        <div
          className={`w-33 p-2.5 typo-button2 ${checkOrderStatus('배송중') ? 'text-primary' : ''}`}
        >
          배송중
        </div>
        <ChevronIconfrom className="w-[18px]" />
        <div
          className={`w-33 p-2.5 typo-button2 ${checkOrderStatus('배송완료') || checkOrderStatus('구매확정') ? 'text-primary' : ''}`}
        >
          배송완료
        </div>
      </div>
      <div className="flex flex-col w-full bg-white">
        <div className="py-4 px-6 typo-button1">주문상품</div>
        <Divider />
        <div className="p-6">
          <OrderProductWrap data={data} />
        </div>
      </div>
      {/* 수신자 정보 */}
      <div className="flex flex-col w-full bg-white">
        <div className="py-4 px-6 typo-button1">수신자 정보</div>
        <Divider />
        <div className="p-6 flex flex-col gap-2">
          <p className="typo-button1">{data.recipient}</p>
          <p className="typo-body3">{formatPhoneNumber(data.phone)}</p>
          <p className="typo-body3">
            {data.address} {data.detailAddress}
          </p>
        </div>
      </div>
      {/* 결제 정보 */}
      <div className="flex flex-col w-full rounded-b-lg bg-white">
        <div className="py-4 px-6 typo-button1">결제정보</div>
        <Divider />
        <div className="py-4 px-6 flex flex-col gap-2">
          <div>
            <div className="flex justify-between items-center py-1">
              <p className="typo-button2">총 주문 금액</p>
              <p className="typo-button1">{formatKoreanWon(data.totalPrice, false)}원</p>
            </div>
            <div className="flex justify-between items-center py-1">
              <p className="typo-button2">배송비</p>
              <p className="typo-button1">0원</p>
            </div>
            <div>
              <div className="flex justify-between items-center py-1">
                <p className="typo-button2">할인 금액</p>
                <p className="typo-button1">{formatKoreanWon(data.totalDiscount, false)}원</p>
              </div>
              <div className="flex justify-between items-center typo-caption1 text-alternative">
                <p className="pl-2">상품 할인</p>
                <p>{formatKoreanWon(data.totalDiscount, false)}원</p>
              </div>
            </div>
          </div>
          <Divider />
          <div className="flex justify-between items-center py-1">
            <p className="typo-button1">총 결제 금액</p>
            <p className="typo-h3 text-primary">{formatKoreanWon(data.totalPayment, false)}원</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetailWrap
