import { CartHeader } from '@/components/cart/CartHeader'
import Divider from '@/components/common/Divider/Divider'
import { getOrderDetail } from '@/services/orderService.server'
import { PageParams } from '@/types/params/pageParamTypes'
import { formatDate } from '@/util/formatDate'
import formatKoreanWon from '@/util/formatKoreanWon'
import Image from 'next/image'

export default async function Page({ params: detailParams }: PageParams<'orderNumber'>) {
  const params = await detailParams
  const orderNumber = String(params?.orderNumber)
  const data = await getOrderDetail(orderNumber)

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
                <Image src={order.mainImage} width={100} height={100} alt="메인 이미지" />
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
