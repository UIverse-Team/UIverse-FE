import { RealTimeProduct } from '@/types/realTimeKeyword/realTimeKeywordType'
import formatKoreanWon from '@/util/formatKoreanWon'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { StarRating } from '../common/rating/StarRating'

export const RealTimeProductCard: React.FC<RealTimeProduct> = ({
  productImageUrl,
  brand,
  name,
  originPrice,
  discountPrice,
  discountRate,
  salesVolume,
  reviewRating,
  productId,
}) => {
  return (
    <Link href={`product/${productId}`} className="flex">
      <div key={productId} className="flex flex-col">
        <Image
          width={248}
          height={248}
          alt="상품 이미지"
          src={productImageUrl}
          className="rounded-md"
        />
        <div>
          <span className="typo-caption1">{brand}</span>
        </div>
        <div>
          <span className="typo-button1 w-full line-clamp-2 text-ellipsis overflow-hidden h-[44px]">
            {name}
          </span>
        </div>
        <div className="flex gap-1 items-center">
          <span className="typo-body3 text-sale">{discountRate}%</span>
          <span className="typo-h3 text-strong">{formatKoreanWon(discountPrice, false)}원</span>
          <span className="text-assistive typo-body3 line-through">
            {formatKoreanWon(originPrice, false)}원
          </span>
        </div>
        <div className="flex items-center">
          <div className="flex gap-0.5">
            <span className="text-alternative typo-body3">판매량</span>
            <span className="text-alternative typo-body3">{salesVolume}</span>
          </div>
          <div className="px-1">
            <span className="w-[1.5px] h-[1.5px] rounded-full block bg-alternative"></span>
          </div>
          <div className="flex gap-0.5 items-center">
            <span>
              <StarRating
                size="sm"
                rating={1}
                filedColor="fill-warning"
                textColor="text-warning"
                showRatingValue={false}
                length={1}
              />
            </span>
            <span className="text-alternative typo-body3">{reviewRating}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
