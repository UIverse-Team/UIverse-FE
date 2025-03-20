import Link from 'next/link'
import { MenuItem } from '@/types/menu/menuType'

const MenuNavItem = ({ item }: { item: MenuItem }) => {
  if (item.isDivider) {
    return <div className="w-[1.5px] h-3.5 bg-alter-line"></div>
  }

  return <Link href={item.href}>{item.label}</Link>
}

export default MenuNavItem
