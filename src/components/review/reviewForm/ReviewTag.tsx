import type { UseFormSetValue } from 'react-hook-form'
import Chip from '@/components/common/Chip/Chip'
import { REVIEW_TAGS } from '@/constants/reviewTag'
import type { ReviewFormValues, ReviewTagKey } from '@/types/review/reviewType'

interface ReviewTagProps {
  tag: ReviewTagKey | ''
  onClickTag: UseFormSetValue<ReviewFormValues>
}

const ReviewTag = ({ tag, onClickTag }: ReviewTagProps) => {
  const handleTagClick = (key: ReviewTagKey) => {
    onClickTag('tag', key)
  }
  return (
    <div className="p-6 flex flex-col gap-4">
      <p className="typo-button1">
        상품을 추천하나요?<span className="text-primary ml-0.5">*</span>
      </p>
      <ul className="flex gap-2 flex-wrap">
        {REVIEW_TAGS.map(({ key, name }) => (
          <li key={key}>
            <Chip variant="tertiary" selected={tag === key} onClick={() => handleTagClick(key)}>
              {name}
            </Chip>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ReviewTag
