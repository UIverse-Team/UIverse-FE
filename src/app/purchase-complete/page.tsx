'use client'
import { CartHeader } from '@/components/cart/CartHeader'
import Divider from '@/components/common/Divider/Divider'
import { Order } from '@/types/orders/orderType'
import formatKoreanWon from '@/util/formatKoreanWon'
import Image from 'next/image'

export const ordersData: Order = {
  id: 3,
  orderNumber: 'O250401UF6XY',
  orderProducts: [
    {
      id: 5,
      saleProductId: 1,
      mainImage: 'https://shopping-phinf.pstatic.net/main_8349493/83494936040.24.jpg',
      productName: 'Red T-Shirt - Size M',
      optionValue: 'Red Shirt',
      paymentPrice: 8100,
      orderPrice: 12600,
      discountPrice: 4500,
      quantity: 6,
      totalPrice: 48600,
      canReview: false,
      brandName: '생활아이디어 콩닥콩닥',
    },
    {
      id: 6,
      saleProductId: 5,
      mainImage: 'https://shopping-phinf.pstatic.net/main_8851371/88513716234.jpg',
      productName: 'Black Jacket - XL',
      optionValue: 'Summer Dress',
      paymentPrice: 23980,
      orderPrice: 28980,
      discountPrice: 5000,
      quantity: 2,
      totalPrice: 47960,
      canReview: false,
      brandName: '어데이즈',
    },
  ],
  orderStatus: 'PAYMENT_COMPLETED',
  totalPrice: 96560,
  createdAt: '2025-04-01T11:17:50.065796',
  totalQuantity: 8,
}

export default function Page() {
  // const { data, isLoading, isError } = useFetchData<string>(QUERY_KEYS.POPULARITY(size), () =>
  //   getProductsPopularity(size),
  // )

  return (
    <div className="flex flex-col gap-4">
      <CartHeader />
      <div className="bg-white p-6 ">
        <div className="flex flex-col gap-4">
          <span className="typo-caption1">2025.03.19. 10:34:25</span>
          <span className="typo-h3">주문번호 7100101399548</span>
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
            {ordersData.orderProducts.map((order) => (
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
          <span className="typo-caption1">한은서</span>
          <span className="typo-body3">010-000-0000</span>
          <span className="typo-body3">서울시 강남구 강남대로 84길 5 미왕빌딩</span>
        </div>
      </div>
      <div className="bg-white">
        <div className="p-6 border-b-[1px] border-alter-line typo-button1">결제 정보</div>
        <div className="px-6 py-4 flex flex-col gap-2">
          <div className="flex justify-between">
            <span className="typo-button2">총 주문 금액</span>
            <span className="typo-button1">{formatKoreanWon(ordersData.totalPrice, false)}원</span>
          </div>
          <div className="flex justify-between">
            <span className="typo-button2">배송비</span>
            <span className="typo-button1">0원</span>
          </div>
          <div className="flex justify-between">
            <span className="typo-button2">할인금액</span>
            <span className="typo-button1">58.500원</span>
          </div>
          <div className="flex justify-between">
            <span className="typo-button1">총 결제 금액</span>
            <span className="typo-h3 text-primary">
              {formatKoreanWon(ordersData.totalPrice, false)}원
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
