import OrderDetailWrap from '@/components/order/OrderDetailWrap'
import { OrderType } from '@/types/orders/orderType'
import React from 'react'

const data = {
  orderId: 83,
  orderNumber: 'O250401TYCNC',
  orderStatus: 'PURCHASED_CONFIRMED' as OrderType,
  totalPrice: 226900,
  totalDiscount: 76400,
  totalPayment: 150500,
  createdAt: '2025-04-01T07:52:54.650244',
  recipient: '박소윤',
  phone: '01012345678',
  zoneCode: '10054',
  address: '미왕빌딩 10층',
  detailAddress: '6601호',
  email: 'test@example.com',
  products: [
    {
      id: 156,
      saleProductId: 2231,
      mainImage: 'https://shopping-phinf.pstatic.net/main_8770526/87705266971.jpg',
      productName: '자체제작 슬림 세미 크롭 반팔 레이어드 이너 티셔츠 여자흰티',
      optionValue: '블랙/L',
      paymentPrice: 13900,
      orderPrice: 21000,
      discountPrice: 7100,
      quantity: 10,
      totalPrice: 139000,
      canReview: true,
      brandName: '솔리데이',
    },
    {
      id: 157,
      saleProductId: 2250,
      mainImage: 'https://shopping-phinf.pstatic.net/main_8749622/87496220422.15.jpg',
      productName:
        '여성 티셔츠 봄 면 모달 이너 티셔츠 반팔 긴팔 U넥 단가라 크롭 오버핏 박스 롱 레이어드 기본티',
      optionValue: '화이트/FREE',
      paymentPrice: 11500,
      orderPrice: 16900,
      discountPrice: 5400,
      quantity: 1,
      totalPrice: 11500,
      canReview: true,
      brandName: '해시노멀',
    },
  ],
}

const QuestOrderPage = () => {
  return <OrderDetailWrap data={data} />
}

export default QuestOrderPage
