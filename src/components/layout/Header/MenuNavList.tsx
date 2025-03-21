import { MenuItem } from '@/types/menu/menuType'
import MenuNavItem from './MenuNavItem'

// 메뉴 네비게이션 컴포넌트
const MenuNavList = ({ items }: { items: MenuItem[] }) => {
  return (
    <nav>
      <ul className="flex gap-6 typo-button1 text-normal">
        {items.map((item) => (
          <li key={item.id} className="flex items-center">
            <MenuNavItem item={item} />
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default MenuNavList
