import { useState, useCallback, Suspense, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/constants/queryKeys'
import { ROUTES } from '@/constants/routes'
import { fetchSubCategories } from '@/services/categoryService'
import { useRootCategories } from '@/hooks/useRootCategories'
import HamburgerLoadingMenu from './LoadingMenu'
import ShadowLayer from './ShadowLayer'
import RootCategoriesMenu from './RootCategoriesMenu'
import SecondLevelMenu from './SecondLevelMenu'
import ThirdLevelMenu from './ThirdLevelMenu'

// 전체 메뉴를 관리하는 컴포넌트
function HamburgerMenuContainer() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [activeRootId, setActiveRootId] = useState<number | null>(null)
  const [activeSecondLevelId, setActiveSecondLevelId] = useState<number | null>(null)

  const rootContainerRef = useRef<HTMLUListElement>(null)
  const menuContainerRef = useRef<HTMLDivElement>(null)

  const { data: rootCategories = [] } = useRootCategories()

  // 모든 카테고리 데이터를 한 번에 가져와서 캐시에 저장
  useEffect(() => {
    const fetchAllCategories = async () => {
      if (rootCategories.length > 0) {
        try {
          // 모든 루트 카테고리의 서브 카테고리(2뎁스, 3뎁스) 데이터를 한번에 가져와 캐시에 저장
          await Promise.all(
            rootCategories.map(async (rootCategory) => {
              // 2뎁스 카테고리 데이터 가져오기
              const secondLevelCategories = await fetchSubCategories(rootCategory.id)

              // 2뎁스 데이터를 쿼리 캐시에 직접 저장
              queryClient.setQueryData(
                QUERY_KEYS.SUB_CATEGORIES(rootCategory.id),
                secondLevelCategories,
              )

              // 3뎁스 카테고리 데이터 가져오기 및 캐시에 저장
              if (secondLevelCategories && secondLevelCategories.length > 0) {
                await Promise.all(
                  secondLevelCategories.map(async (secondCategory) => {
                    const thirdLevelCategories = await fetchSubCategories(secondCategory.id)

                    // 3뎁스 데이터를 쿼리 캐시에 직접 저장
                    queryClient.setQueryData(
                      QUERY_KEYS.SUB_CATEGORIES(secondCategory.id),
                      thirdLevelCategories,
                    )
                  }),
                )
              }
            }),
          )
        } catch (error) {
          console.error('Error fetching categories:', error)
        }
      }
    }

    fetchAllCategories()
  }, [rootCategories, queryClient])

  // 카테고리 클릭 처리
  const handleCategoryClick = useCallback(
    (categoryId: number) => {
      router.prefetch(`${ROUTES.CATEGORIES}/${categoryId}`)
    },
    [router],
  )

  // 1뎁스 카테고리 호버 처리
  const handleRootHover = useCallback((id: number | null) => {
    setActiveRootId(id)
    // 새로운 루트 카테고리로 이동할 때 3뎁스 메뉴 리셋
    setActiveSecondLevelId(null)
  }, [])

  // 2뎁스 카테고리 호버 처리
  const handleSecondLevelHover = useCallback((id: number | null) => {
    setActiveSecondLevelId(id)
  }, [])

  // 메뉴 영역 벗어났을 때 처리
  const handleMenuMouseLeave = useCallback(() => {
    setActiveRootId(null)
    setActiveSecondLevelId(null)
  }, [])

  return (
    <div className="absolute left-0 top-full w-56" ref={menuContainerRef}>
      {/* 주 메뉴 컨테이너 */}
      <div className="relative">
        {/* 1뎁스 메뉴 */}
        <RootCategoriesMenu
          rootCategories={rootCategories}
          activeRootId={activeRootId}
          onRootHover={handleRootHover}
          onCategoryClick={handleCategoryClick}
          rootContainerRef={rootContainerRef}
          onMenuMouseLeave={handleMenuMouseLeave}
        />

        {/* 2뎁스 메뉴 - 조건부 렌더링은 컴포넌트 내부에서 처리 */}
        <SecondLevelMenu
          activeRootId={activeRootId}
          onSecondLevelHover={handleSecondLevelHover}
          onCategoryClick={handleCategoryClick}
          activeSecondLevelId={activeSecondLevelId}
          onMenuMouseLeave={handleMenuMouseLeave}
        />

        {/* 3뎁스 메뉴 - 조건부 렌더링은 컴포넌트 내부에서 처리 */}
        <ThirdLevelMenu
          activeSecondLevelId={activeSecondLevelId}
          onCategoryClick={handleCategoryClick}
          onMenuMouseLeave={handleMenuMouseLeave}
        />

        {/* 통합된 그림자 레이어 컴포넌트 */}
        <ShadowLayer activeRootId={activeRootId} activeSecondLevelId={activeSecondLevelId} />
      </div>
    </div>
  )
}

// 최상위 HamburgerMenu 컴포넌트
export default function HamburgerMenu() {
  return (
    <Suspense fallback={<HamburgerLoadingMenu />}>
      <HamburgerMenuContainer />
    </Suspense>
  )
}
