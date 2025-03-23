import Image from 'next/image'
import Checkbox from '../common/Checkbox/Checkbox'
import { CartDetailResponse } from '@/types/cart/cartType'

interface CartItemListProps {
  onSelectedItems: string[]
  item: CartDetailResponse
  onHandleSelectItem: (value: string) => void
}

export const CartItem = ({ onSelectedItems, item, onHandleSelectItem }: CartItemListProps) => {
  return (
    <div className="flex gap-2">
      <div className="flex flex-col">
        <Checkbox
          checked={onSelectedItems.includes(item.cartId.toString())}
          onClick={() => onHandleSelectItem(item.cartId.toString())}
          className="w-6 h-6"
        />
      </div>
      <div className="flex items-center w-full justify-around ">
        <div className="flex gap-4 ">
          <div>
            <Image
              src={item.image}
              width={138}
              height={138}
              alt="상품 이미지"
              style={{ objectFit: 'cover' }}
              className="rounded-xl"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="typo-caption1 text-alternative">{item.brandName}</h3>
            <div>
              <h1 className="line-clamp-2 overflow-hidden text-ellipsis typo-button1 w-60">
                {item.productName}
              </h1>
            </div>
            <span className="typo-caption1 ">
              {item.optionName} / 수량 {item.quantity}개
            </span>
            <span className="typo-caption1">
              무료배송 <span className="text-positive typo-caption1">03/18(화) 출발 예정</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
