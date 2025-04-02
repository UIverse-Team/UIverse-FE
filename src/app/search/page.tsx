import SearchHeader from '@/components/search/SearchHeader'
// import StoreSection from '@/components/search/StoreSection'
import ProductSection from '@/components/search/ProductSection'
import Redirect from '@/components/common/Redirect/Redirect'
import { getAllProducts } from '@/services/productService.server'
import { PageParams } from '@/types/params/pageParamTypes'
import PrefetchedQueryHydrationBoundary from '@/libs/tanstackQuery/PrefetchedQueryHydrationBoundary'
import { QUERY_KEYS } from '@/constants/queryKeys'
import { Suspense } from 'react'
import { AllProductSkeleton } from '@/components/product/AllProductSkeleton'

const SearchPage = async ({ searchParams }: PageParams) => {
  const params = await searchParams

  // 추후 다른 필터 값에 따른 params 추가 필요
  const keyword = params?.keyword ? decodeURIComponent(String(params.keyword)) : undefined
  const sort = (params?.sort as string) || 'wish'
  const size = Number(params?.size as string) || 48
  const page = Number(params?.page as string) || 0

  if (!keyword) {
    return <Redirect to="back" fallback="/" message="검색어를 입력해주세요." toastType="error" />
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* 검색결과 헤더 */}
      <SearchHeader keyword={keyword} />

      {/* 추후 스토어 api 추가 필요 */}
      <PrefetchedQueryHydrationBoundary
        queryList={[
          {
            queryKey: QUERY_KEYS.SEARCH(keyword, sort, size, page),
            queryFn: () => getAllProducts({ keyword, sort, size, page }),
          },
        ]}
      >
        {/* 스토어 섹션 */}
        {/* <StoreSection stores={stores} /> */}

        {/* 상품 결과 */}
        <Suspense fallback={<AllProductSkeleton />}>
          <ProductSection sort={sort} keyword={keyword} size={size} page={page} />
        </Suspense>
      </PrefetchedQueryHydrationBoundary>
    </div>
  )
}

export default SearchPage
