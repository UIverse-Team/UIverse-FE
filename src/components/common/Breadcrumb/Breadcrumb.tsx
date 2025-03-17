import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
export interface BreadcrumbItemType {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItemType[]
  showHomeIcon?: boolean
  className?: string
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, showHomeIcon = true, className }) => {
  const pathname = usePathname()
  console.log(pathname)
  const breadcrumbItems = items.length > 0 ? items : generateBreadcrumbItems(pathname)
  return (
    <nav aria-label="Breadcrumb" className={cn('flex flex-wrap items-center', className)}>
      <ol className="flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5">
        {showHomeIcon && (
          <li className="inline-flex items-center gap-1.5">
            <Link
              href="/"
              className={`typo-caption1 ${pathname === '/' ? 'text-strong typo-button2' : 'text-assistive typo-caption1'}`}
            >
              홈
            </Link>
            <span
              className={`typo-caption1 ${pathname === '/' ? 'text-strong typo-button2' : 'text-assistive typo-caption1'}`}
            >
              {'>'}
            </span>
          </li>
        )}

        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1

          return (
            <li key={`${item.label}-${index}`} className="inline-flex items-center gap-1.5">
              {isLast ? (
                <span
                  aria-current="page"
                  className={`typo-button2 ${pathname === item.href ? 'text-strong  typo-button2' : 'text-assistive typo-caption1'}`}
                >
                  {item.label}
                </span>
              ) : (
                <>
                  <Link
                    href={item.href || '#'}
                    className={`typo-button2 ${pathname === item.href ? 'text-strong  typo-button2' : 'text-assistive typo-caption1'}`}
                  >
                    {item.label}
                  </Link>
                  <span
                    className={`typo-button2 ${pathname === item.href ? 'text-strong typo-button2' : 'text-assistive typo-caption1'}`}
                  >
                    {'>'}
                  </span>
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

const generateBreadcrumbItems = (pathname: string): BreadcrumbItemType[] => {
  const pathSegments = pathname.split('/').filter((segment) => segment && !segment.includes('?'))
  return pathSegments.map((segment, index) => {
    const href = '/' + pathSegments.slice(0, index + 1).join('/')

    const label = segment.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())

    return { label, href }
  })
}

export default Breadcrumb
