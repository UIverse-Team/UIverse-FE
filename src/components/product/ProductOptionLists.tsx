'use client'

import { ProductOptions } from '@/types/Product/productDetailType'
import { ProductColorOptionList } from './ProductColorOptionList'
import { ProductSizeOptionList } from './ProductSizeOptionList'

interface ProductOptionProps {
  option: ProductOptions[]
}

export const ProductOptionLists = ({ option }: ProductOptionProps) => {
  return (
    <>
      <ProductSizeOptionList option={option} />

      <ProductColorOptionList option={option} />
    </>
  )
}
