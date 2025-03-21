import type { MenuItem } from '@/types/menu/menuType'

export const MENU_ITEMS: MenuItem[] = [
  { id: 'home', label: '홈', href: '/' },
  { id: 'recommend', label: '맞춤추천', href: '#' },
  { id: 'sale', label: '세일', href: '#' },
  { id: 'best', label: '베스트', href: '#' },
  { id: 'divider1', label: '', href: '', isDivider: true },
  { id: 'clothes', label: '의류', href: '#' },
  { id: 'accessories', label: '패션잡화', href: '#' },
  { id: 'digital', label: '디지털/가전', href: '#' },
  { id: 'furniture', label: '가구/인테리어', href: '#' },
  { id: 'food', label: '식품', href: '#' },
]
