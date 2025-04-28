'use client'

import { Suspense } from 'react'
import { AllProductSkeleton } from '../product/AllProductSkeleton'
import ProductSection from './ProductSection'

interface ProductSectionProps {
  sort: string
  keyword: string
  size?: number
  page?: number
  categoryId: number
  price: number[]
}

const SearchContainer = ({ sort, keyword, size, page, categoryId, price }: ProductSectionProps) => {
  return (
    <Suspense fallback={<AllProductSkeleton />}>
      <ProductSection
        sort={sort}
        keyword={keyword}
        size={size}
        page={page}
        categoryId={categoryId}
        price={price}
      />
    </Suspense>
  )
}

export default SearchContainer
