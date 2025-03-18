import { StarRating } from '@/components/common/rating/StarRating'
import Share from '../../../public/share.svg'

interface ProductInfoProps {
  brand: string
  name: string
  originConvertPrice: string
  discountConvertPrice: string
}

export const ProductInfo = ({
  brand,
  name,
  originConvertPrice,
  discountConvertPrice,
}: ProductInfoProps) => {
  return (
    <>
      <div className="flex flex-col gap-[15px] border-b-[1px] pb-4 border-gray-100">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2 flex-1">
            <h3 className="typo-body2">{brand}</h3>
            <h1 className="typo-h3 w-[95%]">{name}</h1>
          </div>
          <div className="w-[54px] h-[54px] border-2 rounded-full  items-center justify-center border-gray-100 flex mb-10">
            <Share />
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <div>
            <StarRating rating={4.5} size="md" showRatingValue={true} />
          </div>
          <span className="typo-caption1 underline">2.183건</span>
        </div>
      </div>
      <div className="border-b-[1px] pb-4 border-gray-100">
        <div className="flex gap-4 items-center">
          <span className="text-alternative text-caption1 decoration-1 decoration-solid decoration-alter-line ">
            판매가
          </span>
          <span className="text-alternative typo-caption1 line-through">
            {originConvertPrice}원
          </span>
        </div>
        <div className="flex gap-4 items-center">
          <span className="text-alternative text-caption1">할인가</span>
          <div className="flex gap-2">
            <span className="text-sale typo-h2">49%</span>
            <span className="typo-h2">
              {discountConvertPrice}
              <span className="typo-h3">원</span>
            </span>
          </div>
        </div>
      </div>
      <div className="border-b-[1px] pb-4 border-gray-100">
        <div className="flex gap-4">
          <span className="text-alternative typo-caption1">배송비</span>
          <div className="flex flex-col gap-2">
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
