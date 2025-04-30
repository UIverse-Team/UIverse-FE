import { type Control, Controller } from 'react-hook-form'
import { StarRatingInput } from '@/components/common/rating/StarRatingInput'
import type { ReviewFormValues } from '@/types/review/reviewType'

interface ReviewRatingProps {
  rating: number
  control: Control<ReviewFormValues, unknown, ReviewFormValues>
}

const ReviewRating = ({ control }: ReviewRatingProps) => {
  return (
    <div className="p-6 flex justify-between items-center">
      <div className="flex flex-col">
        <p className="typo-button1">
          상품은 만족하셨나요?<span className="text-primary ml-0.5">*</span>
        </p>
      </div>
      <Controller
        name="rating"
        control={control}
        rules={{ required: true, min: 1 }}
        render={({ field }) => (
          <StarRatingInput
            initialRating={field.value}
            onChange={(rating) => field.onChange(rating)}
          />
        )}
      />
    </div>
  )
}

export default ReviewRating
