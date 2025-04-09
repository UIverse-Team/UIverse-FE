'use client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/common/Select/Select'
import { ProductOptions } from '@/types/Product/productDetailType'

interface ProductOptionProps {
  option: ProductOptions[]
}

export const ProductColorOptionList = ({ option }: ProductOptionProps) => {
  return (
    <Select defaultValue={'default'}>
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
