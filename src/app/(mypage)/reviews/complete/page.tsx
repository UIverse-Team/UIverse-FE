import Image from 'next/image'
import Link from 'next/link'
import Divider from '@/components/common/Divider/Divider'
import Button from '@/components/common/Button/Button'
import { ROUTES } from '@/constants/routes'
import BodyStyleController from '@/components/common/BodyStyleController'
import Redirect from '@/components/common/Redirect/Redirect'
import ReviewCompleteContent from '@/components/review/reviewComplete/ReviewCompleteContent'
import reviewCompleteImg from '/public/icons/review-complete.svg'

interface ReviewCompletePageProps {
  searchParams: {
    reviewId?: string
    orderDetailId?: string
  }
}

const ReviewCompletePage = async ({ searchParams }: ReviewCompletePageProps) => {
  const { reviewId, orderDetailId } = await searchParams

  if (!reviewId || !orderDetailId) {
    return <Redirect to="back" fallback="/" message="잘못된 접근입니다" toastType="error" />
  }

  return (
    <div className="max-w-[640px] mx-auto bg-white rounded-lg">
      {/* body에 overflow: hidden 적용 */}
      <BodyStyleController />

      {/* Header */}
      <section className="p-6 text-center">
        <h3 className="typo-h3">리뷰작성을 완료했어요</h3>
      </section>
      <Divider />
      <section className="p-6 space-y-8">
        <Image
          src={reviewCompleteImg}
          width={200}
          height={200}
          alt="리뷰 작성 완료"
          className="mx-auto"
        />
        <div className="text-center">
          <p className="typo-button1">정성스러운 리뷰, 잘 받았어요 😊</p>
          <p className="typo-caption1 text-alternative">앞으로도 솔직한 후기 많이 남겨주세요!</p>
        </div>
        <ReviewCompleteContent reviewId={reviewId} orderDetailId={orderDetailId} />
      </section>

      <section className="p-6 flex gap-4">
        <Button size="md" variant="tertiary" asChild>
          <Link href={ROUTES.REVIEWS}>내 리뷰 보기</Link>
        </Button>
        <Button size="md" asChild>
          <Link href={ROUTES.HOME}>홈으로</Link>
        </Button>
      </section>
    </div>
  )
}

export default ReviewCompletePage
