import Divider from '@/components/common/Divider/Divider'
import ChevronIconfrom from '/public/icons/chevron.svg?svgr'
import { ORDER_STATUS_LABELS, OrderType } from '@/types/orders/orderType'
import { OrderDetailWrap } from '@/components/order/OrderDetail'
import formatKoreanWon from '@/util/formatKoreanWon'

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

export default function OrdersPage() {
  function formatTimestamp(timestamp: string): string {
    const date = new Date(timestamp)

    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')

    return `${year}.${month}.${day}. ${hours}:${minutes}:${seconds}`
  }

  function formatPhoneNumber(phone: string): string {
    const cleaned = phone.replace(/\D/g, '')

    if (cleaned.length === 10) {
      return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
    } else if (cleaned.length === 11) {
      return cleaned.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
    }

    return phone
  }

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
          <OrderDetailWrap data={data} />
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
