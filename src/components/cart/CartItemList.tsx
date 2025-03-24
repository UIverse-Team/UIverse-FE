import { CartDetailResponse, CartType } from '@/types/cart/cartType'
import { CartItem } from './CartItem'
import { NumbericField } from '../common/NumbericField/NumbericField'
import formatKoreanWon from '@/util/formatKoreanWon'
import Button from '../common/Button/Button'
import Close from '/public/icons/close.svg?svgr'

interface CartItemProps {
  onItem: CartDetailResponse
  onIndex: number
  onCart: CartType
  onSelectedItems: string[]
  onHandleSelectItem: (id: string) => void
  onHandleDeleteCartItem: (productId: number, check: boolean) => void
  user: boolean
}

export const CartItemList = ({
  onItem,
  onIndex,
  onCart,
  onSelectedItems,
  onHandleSelectItem,
  onHandleDeleteCartItem,
  user,
}: CartItemProps) => {
  return (
    <div
      className={`flex flex-col gap-4 ${
        onIndex === onCart.cartDetailResponseList.length - 1 ? '' : 'border-b-[1px] border-gray-100'
      } pb-6`}
      key={onItem.cartId}
    >
      <div className="flex gap-2 justify-around ">
        <CartItem
          onSelectedItems={onSelectedItems}
          item={onItem}
          onHandleSelectItem={onHandleSelectItem}
        />
        <div className=" flex items-center justify-center">
          <NumbericField itemsQuantity={onItem.quantity} cartId={String(onItem.cartId)} />
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="flex flex-col items-end">
            <h3 className="typo-h3">{formatKoreanWon(onItem.orderPrice, false)}원</h3>
          </div>
          <Button variant={'outline'} size="md">
            바로구매
          </Button>
        </div>
        <div className="flex">
          <Close onClick={() => onHandleDeleteCartItem(onItem.cartId, user)} />
        </div>
      </div>
    </div>
  )
}
