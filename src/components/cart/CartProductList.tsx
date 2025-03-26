'use client'
import { QUERY_KEYS } from '@/constants/queryKeys'
import useFetchData from '@/hooks/useFetchData'
import { getProductsPopularity } from '@/services/productService'
import { AllProduct, ProductResponse } from '@/types/Product/productsType'
import formatKoreanWon from '@/util/formatKoreanWon'
import Image from 'next/image'
import Link from 'next/link'
import LoadingSpinner from '../common/Loading/LoadingSipnner'

export const CartProductList = () => {
  const { data, isLoading, isError } = useFetchData<ProductResponse[]>(
    QUERY_KEYS.POPULARITY,
    () => getProductsPopularity(),
    {
      gcTime: 5 * 60 * 1000, // 5분
      staleTime: 1 * 60 * 1000, // 1분
    },
  )
  if (isLoading) <LoadingSpinner />

  if (isError) <div>에러가 발생</div>

  return (
    <div className="flex rounded-2xl p-6 bg-white flex-col gap-2">
      <h1 className="typo-3">인기 상품 추천</h1>
      <div className="flex gap-4 ">
        {data?.map((product: ProductResponse) =>
          product.content.map((item: AllProduct) => (
            <Link href={`product/${item.id}`} key={item.id}>
              <div className="flex flex-col gap-2 w-[180px]">
                <div className="rounded-md  w-[180px] h-[180px] ">
                  <Image
                    src={item.mainImage}
                    alt="상품 메인 이미지"
                    style={{ objectFit: 'cover' }}
                    className="rounded-md"
                    width={180}
                    height={180}
                  />
                </div>
                <div>
                  <h3 className="typo-caption2">{item.brand}</h3>
                  <span className="typo-button2 overflow-hidden text-ellipsis w-full line-clamp-2">
                    {item.name}
                  </span>
                  <div className="flex gap-1">
                    <h3 className="typo-h3 text-sale">{item.discountRate}%</h3>
                    <h3 className="typo-h3">{formatKoreanWon(item.discountPrice, false)}원</h3>
                  </div>
                </div>
              </div>
            </Link>
          )),
        )}
      </div>
    </div>
  )
}
