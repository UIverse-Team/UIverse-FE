import { Controller, type Control, type FieldErrors } from 'react-hook-form'
import { Textarea } from '@/components/common/Textarea/Textarea'
import { Label } from '@/components/common/Label/Label'
import { HelperLabel } from '@/components/common/HelperLabel/HelperLabel'
import type { ReviewFormValues } from '@/types/review/reviewType'

interface ReviewContentProps {
  content: string
  errors: FieldErrors<ReviewFormValues>
  control: Control<ReviewFormValues, unknown, ReviewFormValues>
  maxLength: number
}

const ReviewContent = ({ content, errors, control, maxLength }: ReviewContentProps) => {
  // 리뷰 내용 오류 메시지 렌더링
  const renderContentError = () => {
    if (errors.content?.type === 'maxLength') {
      return (
        <HelperLabel variant="error" className="px-0.5 py-1.5">
          500자 이내로 작성해 주세요. 꼭 하고 싶은 이야기를 중심으로 적어주세요.
        </HelperLabel>
      )
    }

    return null
  }

  return (
    <div className="p-6 flex flex-col gap-4">
      <div className="flex flex-col">
        <Label className="typo-button1" htmlFor="content">
          이 상품의 후기를 자세히 작성해주세요<span className="text-primary ml-0.5">*</span>
        </Label>
      </div>
      <div className="flex flex-col">
        <div className="relative flex">
          <Controller
            name="content"
            control={control}
            rules={{
              required: true,
              maxLength,
            }}
            render={({ field }) => (
              <Textarea
                id="content"
                rows={4}
                placeholder={`직접 사용해본 솔직한 후기를 자세히 알려주세요. 
가장 좋았던 점은 무엇이었나요?
누구에게 추천해주고 싶나요?`}
                className="pb-2.5 w-full"
                maxLength={maxLength}
                error={!!errors.content}
                {...field}
              />
            )}
          />
          <span className="absolute right-4 bottom-2.5 typo-caption2 text-assistive">
            {content?.length || 0}/{maxLength}
          </span>
        </div>
        {renderContentError()}
      </div>
    </div>
  )
}

export default ReviewContent
