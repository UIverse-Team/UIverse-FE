import Link from 'next/link'
import { useQueryClient } from '@tanstack/react-query'
import { MENU_DEFAULT_HEIGHT } from '@/constants/hamburgerMenu'
import { QUERY_KEYS } from '@/constants/queryKeys'
import useFetchData from '@/hooks/useFetchData'
import { fetchSubCategories } from '@/services/categoryService'
import type { Category } from '@/types/category/categoryTypes'

// 3뎁스 카테고리 컴포넌트 Props 타입
type ThirdLevelMenuProps = {
  activeSecondLevelId: number | null
  onCategoryClick: (id: number) => void
  onMenuMouseLeave: () => void
}

// 3뎁스 카테고리 컴포넌트 - 독립적으로 분리
function ThirdLevelMenu({
  activeSecondLevelId,
  onCategoryClick,
  onMenuMouseLeave,
}: ThirdLevelMenuProps) {
  const queryClient = useQueryClient()
  // 3뎁스 카테고리 데이터를 캐시에서 조회
  const { data: thirdLevelCategories = [], isLoading } = useFetchData<Category[]>(
    activeSecondLevelId ? QUERY_KEYS.SUB_CATEGORIES(activeSecondLevelId) : ['empty'],
    activeSecondLevelId
      ? () => {
          // 캐시된 데이터가 있는지 확인
          const cachedData = queryClient.getQueryData<Category[]>(
            QUERY_KEYS.SUB_CATEGORIES(activeSecondLevelId),
          )
          if (cachedData) {
            return Promise.resolve(cachedData)
          }
          // 캐시된 데이터가 없으면 직접 가져오기
          return fetchSubCategories(activeSecondLevelId)
        }
      : () => Promise.resolve([]),
    {
      staleTime: Infinity,
      cacheTime: 1000 * 60 * 60 * 24,
    },
  )

  if (!activeSecondLevelId) return null

  if (isLoading) {
    return (
      <div className="absolute depth-menu third-level-menu" style={{ left: '448px', top: 0 }}>
        <ul
          className="bg-white w-56 py-5 border-l border-assist-line z-30 relative overflow-y-auto"
          style={{ height: MENU_DEFAULT_HEIGHT }}
        >
          {[1, 2, 3, 4, 5].map((i) => (
            <li key={i} className="px-5 py-2">
              <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div
      className="absolute depth-menu third-level-menu"
      style={{ left: '448px', top: 0 }}
      onMouseLeave={(e) => {
        // 마우스가 메뉴 영역 밖으로 나가는지 확인 (1뎁스나 2뎁스로 이동하는 경우는 제외)
        const relatedTarget = e.relatedTarget as HTMLElement
        const isMovingToRootOrSecond =
          relatedTarget?.closest('.depth-menu') || relatedTarget?.closest('.root-categories')

        if (!isMovingToRootOrSecond) {
          onMenuMouseLeave()
        }
      }}
    >
      <ul
        className={`bg-white w-56 py-5 z-30 relative border-l border-assist-line rounded-br-lg overflow-y-auto`}
        style={{ height: MENU_DEFAULT_HEIGHT }}
      >
        {thirdLevelCategories.map((thirdLevelCategory) => (
          <li key={thirdLevelCategory.id} className="px-3">
            <Link
              href={`/categories/${thirdLevelCategory.id}`}
              className="typo-caption1 block pl-5 pr-2 py-2 hover:bg-neutral"
              onClick={() => onCategoryClick(thirdLevelCategory.id)}
              prefetch={false}
            >
              {thirdLevelCategory.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ThirdLevelMenu
