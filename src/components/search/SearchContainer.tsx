'use client'

import { Suspense } from 'react'
import { AllProductSkeleton } from '../product/AllProductSkeleton'
import ProductSection from './ProductSection'

interface ProductSectionProps {
  sort: string
  keyword: string
  size?: number
  page?: number
}

const SearchContainer = ({ sort, keyword, size, page }: ProductSectionProps) => {
  return (
    <Suspense fallback={<AllProductSkeleton />}>
      <ProductSection sort={sort} keyword={keyword} size={size} page={page} />
    </Suspense>
  )
}

export default SearchContainer
