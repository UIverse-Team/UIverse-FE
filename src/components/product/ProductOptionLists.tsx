'use client'

import { ProductOptions } from '@/types/Product/productDetailType'
import { ProductColorOptionList } from './ProductColorOptionList'
import { ProductSizeOptionList } from './ProductSizeOptionList'
import { useEffect, useState } from 'react'
import { productStore } from '@/stores/productStore'

interface ProductOptionProps {
  option: ProductOptions[]
}

export const ProductOptionLists = ({ option }: ProductOptionProps) => {
  const { setProductsOption } = productStore()
  const [productOption, setProductOption] = useState({
    id: '',
    color: '',
    size: '',
  })

  useEffect(() => {
    if (productOption) {
      setProductsOption(productOption.id, productOption.color, productOption.size)
    }
  }, [productOption, setProductsOption])
  return (
    <>
      <ProductColorOptionList option={option} setProductOption={setProductOption} />
      <ProductSizeOptionList option={option} setProductOption={setProductOption} />
    </>
  )
}
