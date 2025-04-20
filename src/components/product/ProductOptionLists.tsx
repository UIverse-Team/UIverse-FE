'use client'

import { ProductOptions } from '@/types/Product/productDetailType'
import { ProductColorOptionList } from './ProductColorOptionList'
import { ProductSizeOptionList } from './ProductSizeOptionList'
import { productStore } from '@/stores/productStore'

interface ProductOptionProps {
  option: ProductOptions[]
}

export const ProductOptionLists = ({ option }: ProductOptionProps) => {
  const { productOptions } = productStore()

  // const [productOption, setProductOption] = useState({
  //   id: '',
  //   color: '',
  //   size: '',
  // })

  // useEffect(() => {
  //   if (productOption && productOption.id) {
  //     // Check if this product option already exists in the store
  //     const existingOption = productOptions.find((option) => option.id === productOption.id)

  //     if (existingOption) {
  //       // Update existing option
  //       updateProductOption(productOption.id, productOption.color, productOption.size)
  //     } else {
  //       // Add new option
  //       addProductOption(productOption.id, productOption.color, productOption.size)
  //     }
  //   }
  // }, [productOption, addProductOption, updateProductOption, productOptions])
  console.log(productOptions)
  return (
    <>
      <ProductSizeOptionList option={option} />

      <ProductColorOptionList option={option} />
    </>
  )
}
