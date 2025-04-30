import Image from 'next/image'
import { notFound } from 'next/navigation'
import { StarRating } from '@/components/common/rating/StarRating'
import { OrderListCard } from '@/components/order/OrderListCard'
import { getOrderProduct } from '@/services/orderService.server'
import { getReviewDetail } from '@/services/reviewService.server'

interface ReviewCompleteContentProps {
  reviewId: string
  orderDetailId: string
}

const ReviewCompleteContent = async ({ reviewId, orderDetailId }: ReviewCompleteContentProps) => {
  const [productData, reviewData] = await Promise.all([
    getOrderProduct(orderDetailId),
    getReviewDetail(reviewId),
  ]).catch((error) => {
    console.error('데이터 로딩 실패:', error)
    notFound()
  })

  // 데이터가 없으면 404
  if (!productData || !reviewData) {
    notFound()
  }

  return (
    <div className="space-y-4">
      {/* 상품 정보 */}
      <OrderListCard data={productData} />

      {/* 작성한 리뷰 정보 */}
      <div className="flex gap-4 justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <StarRating
              size="sm"
              rating={reviewData.rating}
              filedColor="fill-strong"
              textColor="text-strong"
              showRatingValue={false}
            />
            <span className="typo-caption1 text-assistive">
              {reviewData.createAt.replaceAll('-', '.')} 작성
            </span>
          </div>
          <div className="line-clamp-3 typo-caption1 text-assistive">{reviewData.content}</div>
        </div>

        {reviewData.images && reviewData.images.length > 0 && (
          <div className="relative flex-shrink-0">
            <Image
              src={reviewData.images[0]}
              width={100}
              height={100}
              alt="리뷰 이미지"
              className="size-25 rounded-md object-cover"
            />
            <div className="absolute bottom-0 right-0 flex justify-center items-center size-9 p-2.5 bg-[rgba(0,0,0,0.75)] rounded-[6px]">
              <span className="typo-button2 text-white">{reviewData.images.length}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ReviewCompleteContent
