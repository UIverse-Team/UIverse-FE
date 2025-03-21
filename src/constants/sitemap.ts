import { SitemapCategory } from '@/types/menu/sitemapType'

export const SITEMAP_DATA: SitemapCategory[] = [
  {
    id: 'ora',
    title: 'Ora',
    links: [
      { id: 'home', label: '홈', href: '/' },
      { id: 'category', label: '카테고리', href: '#' },
      { id: 'shop', label: '쇼핑몰', href: '#' },
      { id: 'mypage', label: '마이페이지', href: '#' },
    ],
  },
  {
    id: 'about',
    title: 'About',
    links: [
      { id: 'intro', label: 'Ora 소개', href: '#' },
      { id: 'help', label: '도움말', href: '#' },
    ],
  },
  {
    id: 'help',
    title: 'Help',
    links: [
      { id: 'notice', label: '공지사항', href: '#' },
      { id: 'faq', label: 'FAQ', href: '#' },
      { id: 'inquiry', label: '문의사항', href: '#' },
    ],
  },
]
