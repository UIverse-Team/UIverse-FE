import type { MenuItem } from '@/types/menu/menuType'
import { ROUTES } from './routes'

export const MENU_ITEMS: MenuItem[] = [
  { id: 'home', label: '홈', href: ROUTES.HOME },
  { id: 'recommend', label: '맞춤추천', href: ROUTES.RECOMMEND },
  { id: 'sale', label: '세일', href: ROUTES.SALE },
  { id: 'best', label: '베스트', href: ROUTES.BEST },
  { id: 'divider1', label: '', href: '', isDivider: true },
  { id: 'clothes', label: '의류', href: ROUTES.CATEGORIES.CLOTHES },
  { id: 'accessories', label: '패션잡화', href: ROUTES.CATEGORIES.ACCESSORIES },
  { id: 'digital', label: '디지털/가전', href: ROUTES.CATEGORIES.DIGITAL },
  { id: 'furniture', label: '가구/인테리어', href: ROUTES.CATEGORIES.FURNITURE },
  { id: 'food', label: '식품', href: ROUTES.CATEGORIES.FOOD },
]
