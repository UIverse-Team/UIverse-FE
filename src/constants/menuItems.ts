import type { MenuItem } from '@/types/menu/menuType'
import { ROUTES } from './routes'

export const DEFAULT_MENU_ITEMS: MenuItem[] = [
  { id: 'home', label: '홈', href: ROUTES.HOME },
  { id: 'recommend', label: '맞춤추천', href: ROUTES.RECOMMEND },
  { id: 'sale', label: '세일', href: ROUTES.SALE },
  { id: 'best', label: '베스트', href: ROUTES.BEST },
  { id: 'divider1', label: '', href: '', isDivider: true },
]
