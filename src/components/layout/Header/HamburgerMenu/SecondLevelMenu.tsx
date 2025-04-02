import Link from 'next/link'
import { useQueryClient } from '@tanstack/react-query'
import { MENU_DEFAULT_HEIGHT, LEFT_BORDER_INSET_SHADOW } from '@/constants/hamburgerMenu'
import { QUERY_KEYS } from '@/constants/queryKeys'
import useFetchData from '@/hooks/useFetchData'
import { fetchSubCategories } from '@/services/categoryService'
import { Category } from '@/types/category/categoryTypes'
import ArrowIcon from '/public/icons/chevron.svg?svgr'

// 2뎁스 카테고리 컴포넌트 Props 타입
type SecondLevelMenuProps = {
  activeRootId: number | null
  onSecondLevelHover: (id: number | null) => void
  onCategoryClick: (id: number) => void
  activeSecondLevelId: number | null
  onMenuMouseLeave: () => void
}

// 2뎁스 카테고리 컴포넌트 - 독립적으로 분리
const SecondLevelMenu = ({
  activeRootId,
  onSecondLevelHover,
  onCategoryClick,
  activeSecondLevelId,
  onMenuMouseLeave,
}: SecondLevelMenuProps) => {
  const queryClient = useQueryClient()
  // 2뎁스 카테고리 데이터를 캐시에서 조회
  const { data: secondLevelCategories = [], isLoading } = useFetchData<Category[]>(
    activeRootId ? QUERY_KEYS.SUB_CATEGORIES(activeRootId) : ['empty'],
    activeRootId
      ? () => {
          // 캐시된 데이터가 있는지 확인
          const cachedData = queryClient.getQueryData<Category[]>(
            QUERY_KEYS.SUB_CATEGORIES(activeRootId),
          )
          if (cachedData) {
            return Promise.resolve(cachedData)
          }
          // 캐시된 데이터가 없으면 직접 가져오기
          return fetchSubCategories(activeRootId)
        }
      : () => Promise.resolve([]),
    {
      staleTime: Infinity,
      cacheTime: 1000 * 60 * 60 * 24,
    },
  )

  // 2뎁스 border-radius 클래스 결정
  const getSecondLevelBorderRadiusClass = () => {
    if (activeSecondLevelId) {
      // 3뎁스가 표시될 때 (border-radius 없음)
      return ''
    } else {
      // 2뎁스까지만 표시될 때 (우측 하단 모서리만 radius)
      return 'rounded-br-lg'
    }
  }

  if (!activeRootId) return null

  if (isLoading) {
    return (
      <div className="absolute depth-menu second-level-menu" style={{ left: '224px', top: 0 }}>
        <ul
          className="bg-white w-56 py-5 border-l border-assist-line z-20 relative overflow-y-auto"
          style={{ height: MENU_DEFAULT_HEIGHT }}
        >
          {[1, 2, 3, 4, 5].map((i) => (
            <li key={i} className="px-3">
              <div className="py-2 pl-5 pr-2">
                <div className="h-5 bg-gray-200 rounded w-24 animate-pulse"></div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div
      className="absolute depth-menu second-level-menu"
      style={{ left: '224px', top: 0 }}
      onMouseLeave={(e) => {
        // 마우스가 메뉴 영역 밖으로 나가는지 확인 (1뎁스나 3뎁스로 이동하는 경우는 제외)
        const relatedTarget = e.relatedTarget as HTMLElement
        const isMovingToRootOrThird =
          relatedTarget?.closest('.depth-menu') || relatedTarget?.closest('.root-categories')

        if (!isMovingToRootOrThird) {
          onMenuMouseLeave()
        }
      }}
    >
      {/* 2뎁스 메뉴 */}
      <ul
        className={`bg-white w-56 py-5 ${
          LEFT_BORDER_INSET_SHADOW
        } z-20 relative ${getSecondLevelBorderRadiusClass()} overflow-y-auto`}
        style={{ height: MENU_DEFAULT_HEIGHT }}
      >
        {secondLevelCategories.map((secondLevelCategory) => (
          <li
            key={secondLevelCategory.id}
            className="group/second px-3"
            onMouseEnter={() => onSecondLevelHover(secondLevelCategory.id)}
          >
            <Link
              href={`/categories/${secondLevelCategory.id}`}
              className="flex items-center justify-between py-2 pl-5 pr-2 cursor-pointer typo-caption1 hover:typo-button2"
              onClick={() => onCategoryClick(secondLevelCategory.id)}
              prefetch={false}
            >
              <span>{secondLevelCategory.name}</span>
              <ArrowIcon className="size-3 text-strong hidden group-hover/second:block" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SecondLevelMenu
