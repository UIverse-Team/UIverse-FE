'use client'

import Image from 'next/image'
import { PopularityType } from '@/types/Product/productsType'
import formatKoreanWon from '@/util/formatKoreanWon'
import { StarRating } from '@/components/common/rating/StarRating'
import { getProductsPopularity } from '@/services/productService'
import { QUERY_KEYS } from '@/constants/queryKeys'
import useFetchData from '@/hooks/useFetchData'
import LoadingSpinner from '../common/Loading/LoadingSipnner'
import Link from 'next/link'

const AllProducts = () => {
  const { data, isLoading } = useFetchData<PopularityType[]>(QUERY_KEYS.POPULARITY, () =>
    getProductsPopularity(),
  )

  if (isLoading) return <LoadingSpinner />

  if (data?.length === 0) {
    return <div>오류가 발생했습니다.</div>
  }
  return (
    <div className="flex gap-4 flex-wrap justify-center border">
      {data?.map((item) => (
        <Link href={`product/${item.id}`} key={item.id}>
          <div className="flex flex-col gap-2 w-[248px]">
            <Image
              width={248}
              height={248}
              alt="상품 이미지"
              src={item.mainImage}
              className="rounded-md"
            />
            <div>
              <span className="typo-caption1">{item.brand}</span>
            </div>
            <div>
              <span className="typo-button1 w-full line-clamp-2 text-ellipsis overflow-hidden h-[44px]">
                {item.name}
              </span>
            </div>
            <div className="flex gap-1 items-center">
              <span className="typo-body3 text-sale">40%</span>
              <span className="typo-h3 text-strong">
                {formatKoreanWon(item.discountPrice, false)}원
              </span>
              <span className="text-assistive typo-body3 line-through">
                {formatKoreanWon(item.originPrice, false)}원
              </span>
            </div>
            <div className="flex items-center">
              <div className="flex gap-0.5">
                <span className="text-alternative typo-body3">판매량</span>
                <span className="text-alternative typo-body3">15,342</span>
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
                <span className="text-alternative typo-body3">4.5</span>
              </div>
            </div>
            <div className="flex gap-1">
              {item.labels !== 'NONE' && (
                <div
                  className={`${
                    item.labels === 'PROMOTION'
                      ? 'text-primary bg-primary-a8 px-1.5 py-1 typo-body3'
                      : 'text-white  bg-sale typo-body3 px-1.5 py-1'
                  }`}
                >
                  {item.labels === 'PROMOTION' ? '프로모션' : '특가'}
                </div>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default AllProducts
