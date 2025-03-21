import Link from 'next/link'
import type { SitemapCategory } from '@/types/menu/sitemapType'

interface SitemapProps {
  category: SitemapCategory
}

const Sitemap = ({ category }: SitemapProps) => {
  return (
    <li className="flex flex-col gap-4">
      <h3 className="typo-h3 text-normal py-1">{category.title}</h3>
      <ul className="flex w-[110px] flex-col items-start gap-1 shrink-0">
        {category.links.map((link) => (
          <li key={link.id}>
            <Link href={link.href} className="text-normal typo-body3 py-2">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  )
}

export default Sitemap
