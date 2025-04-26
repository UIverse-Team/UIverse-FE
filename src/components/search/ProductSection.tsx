'use client'
import Link from 'next/link'
import { PRD_SORT_PARAMS } from '@/constants/prouctSortParams'
import type { AllProduct, ProductResponse } from '@/types/Product/productsType'
import CardProduct from '../common/CardProduct/CardProduct'
import { useSuspenseQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/constants/queryKeys'
import { getAllProducts } from '@/services/productService'
import { ROUTES } from '@/constants/routes'

interface ProductSectionProps {
  sort: string
  keyword: string
  size?: number
  page?: number
  categoryId: number
  price: number[]
}

const ProductSection = ({
  sort,
  keyword,
  size = 48,
  page = 0,
  categoryId,
  price,
}: ProductSectionProps) => {
  const { data } = useSuspenseQuery<ProductResponse>({
    queryKey: QUERY_KEYS.SEARCH(keyword, sort, size, page, categoryId, price),
    queryFn: () => getAllProducts({ keyword, sort, size, page, categoryId, price }),
  })
  const products = data?.content || []
  const totalElements = data?.page?.totalElements || 0

  // 상품을 묶는 헬퍼 함수
  const chunkArray = (array: AllProduct[], chunkSize: number) => {
    const result = []
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize))
    }
    return result
  }
  // 상품을 4개씩 그룹화
  const productRows = chunkArray(products, 4)

  return (
    <div className="w-full p-6 bg-white rounded-lg">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <p className="typo-h3">
            상품
            <span className="typo-button1 text-assistive">
              ({totalElements.toLocaleString('ko-KR')})
            </span>
          </p>
          <div className="flex items-center justify-center gap-4">
            {PRD_SORT_PARAMS.map(({ key, name }) => (
              <Link
                key={key}
                href={`${ROUTES.SEARCH}?keyword=${encodeURIComponent(keyword)}&sort=${key}`}
                className={`${sort === key ? 'typo-button2 text-strong' : 'typo-caption1 text-alternative'}`}
              >
                {name}
              </Link>
            ))}
          </div>
        </div>

        {/* 상품 목록 */}
        {productRows.length > 0 ? (
          <div className="flex flex-col gap-10">
            {productRows.map((row, rowIdx) => (
              <div key={`row-${rowIdx}`} className="flex justify-between">
                {row.map((product) => (
                  <CardProduct key={product.id} item={product} />
                ))}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-assistive typo-body2 py-4 text-center">검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  )
}

export default ProductSection
