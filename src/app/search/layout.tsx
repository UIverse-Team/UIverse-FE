import React from 'react'
import Container from '@/components/layout/Container/Container'
import Divider from '@/components/common/Divider/Divider'
import Checkbox from '@/components/common/Checkbox/Checkbox'
import { Label } from '@/components/common/Label/Label'
import { SearchCategoryFilterList } from '@/components/search/SearchCategoryFilterList'
import PrefetchedQueryHydrationBoundary from '@/libs/tanstackQuery/PrefetchedQueryHydrationBoundary'
import { QUERY_KEYS } from '@/constants/queryKeys'
import { fetchRootCategories } from '@/services/categoryService'

export default async function SearchLayout({ children }: { children: React.ReactNode }) {
  const rootCategory = await fetchRootCategories()

  return (
    <PrefetchedQueryHydrationBoundary
      queryList={[
        {
          queryKey: QUERY_KEYS.ROOT_CATEGORIES,
          queryFn: () => fetchRootCategories(),
        },
      ]}
    >
      <Container>
        <div className="flex gap-4 items-start">
          {/* 왼쪽 메뉴 */}
          <div
            id="leftMenu"
            className="w-[200px] shrink-0 bg-white rounded-lg pt-2 pb-4 flex flex-col gap-2"
          >
            <div className="flex flex-col gap-2">
              <p className="typo-button1 p-4">필터검색</p>

              <div className="flex flex-col gap-4 px-4 pt-4 pb-2">
                <div className="flex items-center gap-2">
                  <Checkbox id="isFreeDelivery" />
                  <Label htmlFor="isFreeDelivery" className="typo-caption1 text-alternative">
                    무료배송
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="isSpecialPrice" />
                  <Label htmlFor="isSpecialPrice" className="typo-caption1 text-alternative">
                    특가상품
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="isHighRatings" />
                  <Label htmlFor="isHighRatings" className="typo-caption1 text-alternative">
                    평점 4.8 이상
                  </Label>
                </div>
              </div>
            </div>
            <Divider />
            <div className="flex flex-col gap-2">
              <SearchCategoryFilterList categorys={rootCategory} />
            </div>
            <Divider />
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between p-4">
                <span className="typo-button1">가격</span>
              </div>
            </div>
            <Divider />
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between p-4">
                <span className="typo-button1">평점</span>
              </div>
            </div>
          </div>
          <div id="contentWrap" className="grow">
            <Container type="mypage">{children}</Container>
          </div>
        </div>
      </Container>
    </PrefetchedQueryHydrationBoundary>
  )
}
