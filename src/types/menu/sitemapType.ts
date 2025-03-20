interface SitemapLink {
  id: string
  label: string
  href: string
}

export interface SitemapCategory {
  id: string
  title: string
  links: SitemapLink[]
}
