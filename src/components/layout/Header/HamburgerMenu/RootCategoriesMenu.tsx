import { RefObject } from 'react'
import Link from 'next/link'
import { MENU_DEFAULT_HEIGHT, RIGHT_BORDER_SHADOW } from '@/constants/hamburgerMenu'
import { Category } from '@/types/category/categoryTypes'
import ArrowIcon from '/public/icons/chevron.svg?svgr'

// 1뎁스 카테고리 컴포넌트 Props 타입
type RootCategoriesMenuProps = {
  rootCategories: Category[]
  activeRootId: number | null
  onRootHover: (id: number | null) => void
  onCategoryClick: (id: number) => void
  rootContainerRef: RefObject<HTMLUListElement>
  onMenuMouseLeave: () => void
}

// 1뎁스 카테고리 컴포넌트
const RootCategoriesMenu = ({
  rootCategories,
  activeRootId,
  onRootHover,
  onCategoryClick,
  rootContainerRef,
  onMenuMouseLeave,
}: RootCategoriesMenuProps) => {
  // 1뎁스 border-radius 클래스 결정
  const getRootBorderRadiusClass = () => {
    if (!activeRootId) {
      // 1뎁스만 표시될 때 (모든 하단 모서리에 radius)
      return 'rounded-b-lg'
    } else {
      // 2뎁스나 3뎁스가 표시될 때 (좌측 하단 모서리만 radius)
      return 'rounded-bl-lg'
    }
  }

  return (
    <ul
      ref={rootContainerRef}
      className={`bg-white w-56 py-5 ${RIGHT_BORDER_SHADOW} z-10 relative ${getRootBorderRadiusClass()}`}
      style={{ height: MENU_DEFAULT_HEIGHT }}
      onMouseLeave={(e) => {
        // 마우스가 메뉴 영역 밖으로 나가는지 확인 (2뎁스나 3뎁스로 이동하는 경우는 제외)
        const relatedTarget = e.relatedTarget as HTMLElement
        const isMovingToSecondOrThird = relatedTarget?.closest('.depth-menu')

        if (!isMovingToSecondOrThird) {
          onMenuMouseLeave()
        }
      }}
    >
      {rootCategories.map((rootCategory) => (
        <li
          key={rootCategory.id}
          className="group/root px-3"
          onMouseEnter={() => onRootHover(rootCategory.id)}
        >
          <Link
            href={`/categories/${rootCategory.id}`}
            className="flex items-center justify-between py-2 pl-5 pr-2 cursor-pointer typo-caption1 hover:typo-button2"
            onClick={() => onCategoryClick(rootCategory.id)}
            prefetch={false}
          >
            <span>{rootCategory.name}</span>
            <ArrowIcon className="size-3 text-strong hidden group-hover/root:block" />
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default RootCategoriesMenu
