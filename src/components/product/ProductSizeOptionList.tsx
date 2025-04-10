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

interface ProductOptionType {
  id: string
  color: string
  size: string
}

interface ProductOptionProps {
  option: ProductOptions[]
  setProductOption: React.Dispatch<React.SetStateAction<ProductOptionType>>
}

export const ProductSizeOptionList = ({ option, setProductOption }: ProductOptionProps) => {
  const { setProductId, getQuantity, setQuantity } = productStore()
  const handleSizeChange = (id: string, newQuantity: number) => {
    setProductId(Number(id))
    setQuantity(id, newQuantity)
    const selectedOption = option.flatMap(
      (opt) => opt.sizes?.filter((item) => String(item.saleProductId) === id) || [],
    )[0]
    if (selectedOption) {
      setProductOption((prev) => ({
        ...prev,
        id: id,
        size: selectedOption.optionValue,
      }))
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
