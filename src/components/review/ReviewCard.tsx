import { ReviewItem } from '@/types/review/reviewType'
import formatKoreanWon from '@/util/formatKoreanWon'
import Link from 'next/link'
import { StarRating } from '../common/rating/StarRating'
import Image from 'next/image'

interface ReviewProps {
  item: ReviewItem
}

export const ReviewCard = ({ item }: ReviewProps) => {
  return (
    <Link href={`product/${item.product.id}`} key={item.product.id}>
      <div className="flex gap-4 p-4">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <div className="h-[44px] typo-body3">{item.content}</div>
            <div className="flex gap-2">
              <span className="flex gap-1 items-center">
                <StarRating
                  size="sm"
                  rating={1}
                  filedColor="fill-warning"
                  textColor="text-warning"
                  showRatingValue={false}
                  length={1}
                />
                <span className="typo-button1">
                  {item.rating}
                  <span className="text-assistive typo-button1">/5</span>
                </span>
                <span className="text-assistive">|</span>
                <span className="flex gap-0.5 typo-caption1 text-assistive">
                  리뷰 <span className="typo-caption1 text-assistive">{item.reviewCount}</span>
                </span>
              </span>
            </div>
          </div>
          <div className="bg-neutral px-4 py-2 flex gap-1 items-center rounded-full w-[314px]">
            <span className="text-secondary whitespace-nowrap typo-caption1">
              {item.product.brand}
            </span>
            <span className="truncate w-[129px] typo-caption1 ">{item.product.name}</span>
            <div className="flex gap-1 whitespace-nowrap">
              <span className="typo-button1 text-sale">{item.product.discountRate}%</span>
              <span className="typo-button1">
                {formatKoreanWon(item.product.discountPrice, false)}원
              </span>
            </div>
          </div>
        </div>
        <div>
          <Image
            src={item.product.mainImage}
            alt={item.product.name}
            width={138}
            height={138}
            className="object-cover rounded-md"
          />
          {item.product.labels && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
              {item.product.labels}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
