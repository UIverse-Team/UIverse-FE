'use client'

import Button from '@/components/common/Button/Button'
import Divider from '@/components/common/Divider/Divider'
import useReviewForm from '@/hooks/useReviewForm'
import type { ReviewFormData } from '@/types/review/reviewType'
import CustomModal from './CustomModal'

import ReviewRating from './ReviewRating'
import ReviewTag from './ReviewTag'
import ReviewContent from './ReviewContent'
import ReviewImage from './ReviewImage'

interface ReviewFormProps {
  orderDetailId: number
  onSubmit?: (formData: ReviewFormData) => void
}

/**
 * 리뷰 작성 폼 컴포넌트
 */
const ReviewForm = ({ orderDetailId, onSubmit }: ReviewFormProps) => {
  const {
    control,
    errors,
    handleSubmit,
    setValue,
    images,
    imageUrls,
    fileInputRef,
    handleImageChange,
    handleRemoveImage,
    MAX_CONTENT_LENGTH,
    MAX_IMAGES,
    isModalOpen,
    setIsModalOpen,
    modalContent,
    isFormValid,
    rating,
    content,
    tag,
  } = useReviewForm(orderDetailId, onSubmit)

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* 평점 섹션 렌더링 */}
        <ReviewRating rating={rating} control={control} />
        <Divider />
        {/* 태그 선택 섹션 렌더링 */}
        <ReviewTag tag={tag} onClickTag={setValue} />
        <Divider />
        {/* 리뷰 내용 섹션 렌더링 */}
        <ReviewContent
          content={content}
          control={control}
          errors={errors}
          maxLength={MAX_CONTENT_LENGTH}
        />
        <Divider />
        {/* 이미지 첨부 섹션 렌더링 */}
        <ReviewImage
          images={images}
          imageUrls={imageUrls}
          fileInputRef={fileInputRef}
          onChangeImage={handleImageChange}
          onRemoveImage={handleRemoveImage}
          maxLength={MAX_IMAGES}
        />
        <div className="p-6">
          <Button type="submit" disabled={!isFormValid}>
            리뷰 등록
          </Button>
        </div>
      </form>

      {/* 커스텀 모달 (이미지 최대 개수 초과와 기타 오류에만 사용) */}
      <CustomModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        title={modalContent.title}
        content={modalContent.content}
      />
    </>
  )
}

export default ReviewForm
