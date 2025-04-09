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

export const ProductSizeOptionList = ({ option }: ProductOptionProps) => {
  return (
    <Select defaultValue={'default'}>
      <SelectTrigger variant="default" size="lg">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="default">사이즈를 선택 해주세요.</SelectItem>
        {option.map((options) =>
          options.sizes?.map((optionItem) => (
            <SelectItem key={`${optionItem.optionValue}`} value={optionItem.optionValue}>
              {optionItem.optionValue}
            </SelectItem>
          )),
        )}
      </SelectContent>
    </Select>
  )
}
