'use client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/common/Select/Select'
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

export const ProductColorOptionList = ({ option, setProductOption }: ProductOptionProps) => {
  const handleColorChange = (value: string) => {
    if (value) {
      setProductOption((prev) => ({
        ...prev,
        color: value,
      }))
    }
  }
  return (
    <Select defaultValue={'default'} onValueChange={(value) => handleColorChange(value)}>
      <SelectTrigger variant="default" size="lg">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="default">색상을 선택해주세요.</SelectItem>
        {option.map((optionItem, index) => (
          <SelectItem key={`${optionItem.color}-${index}`} value={optionItem.color}>
            {optionItem.color}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
