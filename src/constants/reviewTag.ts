import type { ReviewTagKey, ReviewTagName, ReviewTag } from '@/types/review/reviewType'

export const REVIEW_TAG_MAP = {
  RECOMMENDED: '추천해요',
  NEUTRAL: '보통이에요',
  NOT_RECOMMENDED: '별로예요',
} as const

export const REVIEW_TAGS: ReviewTag[] = Object.entries(REVIEW_TAG_MAP).map(([key, name]) => ({
  key: key as ReviewTagKey,
  name: name as ReviewTagName,
}))
