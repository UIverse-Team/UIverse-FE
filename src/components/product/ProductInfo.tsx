'use client'
import { StarRating } from '@/components/common/rating/StarRating'
import Share from '/public/icons/share.svg?svgr'
import Chevron from '/public/icons/chevron.svg?svgr'
import { productScrollLocationStore } from '@/stores/productScrollLocationStrore'

interface ProductInfoProps {
  brand: string
  name: string
  originConvertPrice: string
  discountConvertPrice: string
  reviewCount: number
  discountRate: number
}

export const ProductInfo = ({
  brand,
  name,
  originConvertPrice,
  discountConvertPrice,
  reviewCount,
  discountRate,
}: ProductInfoProps) => {
  const starFiledColor = 'fill-gray-500'
  const starTextColor = 'text-gray-500'

  const { setScroll } = productScrollLocationStore()

  const scrollToSection = (id: 'description' | 'review' | 'chat') => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setScroll(id)
    }
  }

  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-3 flex-1">
            <h3 className="typo-body3 flex items-center gap-[2px] cursor-pointer text-normal">
              {brand}
              <Chevron />
            </h3>
            <h1 className="typo-h3 w-[90%]">{name}</h1>
          </div>
          <div className="w-[54px] h-[54px] border-2 rounded-full  items-center justify-center border-gray-100 flex mb-10 cursor-pointer">
            <Share />
          </div>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <StarRating
          rating={4.5}
          size="sm"
          showRatingValue={true}
          filedColor={starFiledColor}
          textColor={starTextColor}
          length={5}
        />
        <span
          className="typo-caption1 underline cursor-pointer"
          onClick={() => scrollToSection('review')}
        >
          {reviewCount}건
        </span>
      </div>
      <div className="border-b-[1px] border-gray-100 pb-6">
        <div className="flex gap-4 items-center ">
          <span className="text-alternative typo-caption1 decoration-1 decoration-solid decoration-alter-line">
            판매가
          </span>
          <span className="text-alternative typo-caption1 line-through">
            {originConvertPrice}원
          </span>
        </div>
        <div className="flex gap-4 items-center">
          <span className="text-alternative typo-caption1">할인가</span>
          <div className="flex gap-2">
            <span className="text-sale typo-h2">{discountRate}%</span>
            <span className="typo-h2">
              {discountConvertPrice}
              <span className="typo-h3">원</span>
            </span>
          </div>
        </div>
      </div>
      <div className="border-b-[1px] border-gray-100">
        <div className="flex gap-2 pb-6">
          <span className="text-alternative typo-caption1">배송비</span>
          <div className="flex flex-col gap-[3px]">
            <span className="typo-caption1">무료배송</span>
            <span className="text-strong typo-caption1">
              평균 배송기간 <span className="typo-caption1 text-positive">2일 이내</span> (영업일
              기준)
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
