import Divider from '@/components/common/Divider/Divider'
import { OrderListCard } from '@/components/order/OrderListCard'
import ReviewForm from '@/components/review/reviewForm/ReviewForm'
import BodyStyleController from '@/components/common/BodyStyleController'
import Redirect from '@/components/common/Redirect/Redirect'
import MoveBackIcon from '/public/icons/left-arrow.svg?svgr'
import { getOrderProduct } from '@/services/orderService.server'
import { notFound } from 'next/navigation'
import BackButton from '@/components/common/BackButton/BackButton'

interface ReviewRegisterPageProps {
  searchParams: {
    orderDetailId?: string
  }
}

const ReviewRegisterPage = async ({ searchParams }: ReviewRegisterPageProps) => {
  const { orderDetailId } = await searchParams

  if (!orderDetailId) {
    return <Redirect to="back" fallback="/" message="잘못된 접근입니다" toastType="error" />
  }

  const data = await getOrderProduct(orderDetailId)

  // 데이터가 없으면 404
  if (!data) {
    notFound()
  }

  return (
    <div className="max-w-[640px] mx-auto bg-white rounded-lg">
      {/* body에 overflow: hidden 적용 */}
      <BodyStyleController />

      {/* Header */}
      <div className="relative p-6 text-center">
        <h3 className="typo-h3">리뷰작성</h3>
        <BackButton className="absolute top-6 left-6" aria-label="뒤로 가기">
          <MoveBackIcon className="size-6" />
        </BackButton>
      </div>
      <Divider />
      <div className="p-6">
        {/* 상품 정보 */}
        <OrderListCard data={data} />
      </div>
      <Divider />
      <ReviewForm orderDetailId={Number(orderDetailId)} />
    </div>
  )
}

export default ReviewRegisterPage
