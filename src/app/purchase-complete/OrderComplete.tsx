'use client'
import { CartHeader } from '@/components/cart/CartHeader'
import Divider from '@/components/common/Divider/Divider'
import LoadingSpinner from '@/components/common/Loading/LoadingSpinner'
import { QUERY_KEYS } from '@/constants/queryKeys'
import useFetchData from '@/hooks/useFetchData'
import { getByOrders } from '@/services/orderService'
import type { OrderDetail } from '@/types/orders/orderType'
import { formatDate } from '@/util/formatDate'
import formatKoreanWon from '@/util/formatKoreanWon'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'

export default function OrderComplete() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('ordernumber') // URL에서 ordernumber 가져오기

  const { data, isLoading, isError } = useFetchData<OrderDetail>(
    QUERY_KEYS.ORDER_BY_ID(orderId || ''),
    () => getByOrders(orderId || ''),
  )

  if (isLoading) return <LoadingSpinner />

  if (isError || !data)
    return <div className="p-6 text-center">주문 정보를 불러올 수 없습니다.</div>

  return (
    <div className="flex flex-col gap-4">
      <CartHeader />
      <div className="bg-white p-6 ">
        <div className="flex flex-col gap-4">
          <span className="typo-caption1">{formatDate(data.createdAt)}</span>
          <span className="typo-h3">주문번호 {data.orderNumber}</span>
        </div>
      </div>
      <div className="bg-white ">
        <div className=" px-6 ">
          <h1 className="typo-button1 py-4">주문 상품</h1>
          <Divider />
        </div>
        <div className="p-6 flex flex-col ">
          <h3 className="typo-button1 ">결제완료</h3>
          <div className="flex flex-col gap-6 pt-4">
            {data.products.map((order) => (
              <div key={order.id} className=" flex gap-4 rounded-md">
                <Image
                  src={order.mainImage || '/placeholder.svg'}
                  width={100}
                  height={100}
                  alt="메인 이미지"
                />
                <div className="flex flex-col gap-1">
                  <div className="flex flex-col">
                    <h1 className="typo-caption1 text-alternative">{order.brandName}</h1>
                    <h1 className="typo-button1">{order.productName}</h1>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="typo-caption1">{order.optionValue}</span>
                    <span className=" text-alternative">|</span>
                    <span className="typo-caption1">{order.quantity}개</span>
                  </div>
                  <div>
                    <span className="typo-h3">{formatKoreanWon(order.orderPrice, false)}원</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white">
        <div className="px-6 py-4 border-b-[1px] border-alter-line typo-button1">배송지 정보</div>
        <div className="p-6 flex flex-col gap-2">
          <span className="typo-caption1">{data.recipient}</span>
          <span className="typo-body3">{data.phone}</span>
          <span className="typo-body3">{data.address}</span>
        </div>
      </div>
      <div className="bg-white">
        <div className="p-6 border-b-[1px] border-alter-line typo-button1">결제 정보</div>
        <div className="px-6 py-4 flex flex-col gap-2">
          <div className="flex justify-between">
            <span className="typo-button2">총 주문 금액</span>
            <span className="typo-button1">{formatKoreanWon(data.totalPrice, false)}원</span>
          </div>
          <div className="flex justify-between">
            <span className="typo-button2">배송비</span>
            <span className="typo-button1">0원</span>
          </div>
          <div className="flex justify-between">
            <span className="typo-button2">할인금액</span>
            <span className="typo-button1">{formatKoreanWon(data.totalDiscount, false)}원</span>
          </div>
          <div className="flex justify-between">
            <span className="typo-button1">총 결제 금액</span>
            <span className="typo-h3 text-primary">
              {formatKoreanWon(data.totalPrice, false)}원
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
