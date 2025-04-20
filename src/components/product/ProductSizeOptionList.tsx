// 'use client'
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/common/Select/Select'
// import { productStore } from '@/stores/productStore'
// import { ProductOptions } from '@/types/Product/productDetailType'
// import React from 'react'

// interface ProductOptionType {
//   id: string
//   color: string
//   size: string
// }

// interface ProductOptionProps {
//   option: ProductOptions[]
//   setProductOption: React.Dispatch<React.SetStateAction<ProductOptionType>>
// }

// export const ProductSizeOptionList = ({ option, setProductOption }: ProductOptionProps) => {
//   const { setProductId, getQuantity, setQuantity } = productStore()
//   const handleSizeChange = (id: string, newQuantity: number) => {
//     setProductId(Number(id))
//     setQuantity(id, newQuantity)
//     const selectedOption = option.flatMap(
//       (opt) => opt.sizes?.filter((item) => String(item.saleProductId) === id) || [],
//     )[0]
//     if (selectedOption) {
//       setProductOption((prev) => ({
//         ...prev,
//         id: id,
//         size: selectedOption.optionValue,
//       }))
//     }
//   }

//   return (
//     <Select defaultValue={'default'} onValueChange={(id) => handleSizeChange(id, getQuantity(id))}>
//       <SelectTrigger variant="default" size="lg">
//         <SelectValue />
//       </SelectTrigger>
//       <SelectContent>
//         <SelectItem value="default">사이즈를 선택 해주세요.</SelectItem>
//         {option.map((options) =>
//           options.sizes?.map((optionItem) => (
//             <SelectItem key={`${optionItem.optionValue}`} value={String(optionItem.saleProductId)}>
//               {optionItem.optionValue}
//             </SelectItem>
//           )),
//         )}
//       </SelectContent>
//     </Select>
//   )
// }

'use client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/common/Select/Select'
import { productStore } from '@/stores/productStore'
import { ProductOptions } from '@/types/Product/productDetailType'
import React from 'react'

interface ProductOptionProps {
  option: ProductOptions[]
}

export const ProductSizeOptionList = ({ option }: ProductOptionProps) => {
  const {
    setProductId,
    getQuantity,
    setQuantity,
    productOptions,
    addProductOption,
    updateProductOption,
    removeProductOption,
  } = productStore()

  const handleSizeChange = (id: string, newQuantity: number) => {
    if (id === 'default') return

    setProductId(Number(id))
    setQuantity(id, newQuantity)

    // Find the selected option to get the size value
    const selectedOption = option.flatMap(
      (opt) => opt.sizes?.filter((item) => String(item.saleProductId) === id) || [],
    )[0]

    if (selectedOption) {
      const sizeValue = selectedOption.optionValue

      // Check if there's an existing color selection
      const existingColorOption = productOptions.find((opt) => opt.color && !opt.id)
      const existingOption = productOptions.find((opt) => opt.id === id)

      if (existingOption) {
        // Update existing option with this ID
        updateProductOption(id, existingOption.color, sizeValue)
      } else if (existingColorOption) {
        // If we have a color selection but no ID yet, update with real ID
        removeProductOption(id) // Remove the temporary entry
        addProductOption(id, existingColorOption.color, sizeValue)
      } else {
        // Add new option with this ID and size
        addProductOption(id, '', sizeValue)
      }
    }
  }

  return (
    <Select defaultValue={'default'} onValueChange={(id) => handleSizeChange(id, getQuantity(id))}>
      <SelectTrigger variant="default" size="lg">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="default">사이즈를 선택 해주세요.</SelectItem>
        {option.map((options) =>
          options.sizes?.map((optionItem) => (
            <SelectItem key={`${optionItem.optionValue}`} value={String(optionItem.saleProductId)}>
              {optionItem.optionValue}
            </SelectItem>
          )),
        )}
      </SelectContent>
    </Select>
  )
}
