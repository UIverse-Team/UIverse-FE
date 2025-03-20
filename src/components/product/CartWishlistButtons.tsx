'use client'
import { useCart } from '@/hooks/useCart'
import Button from '../common/Button/Button'
import Wishlist from '/public/icons/wishlist.svg?svgr'
// import { Product } from '@/types/Product/Product'

interface ProductProps {
  productId: number
  quantity: number
}

export const CartWishlistButtons = ({ productId, quantity }: ProductProps) => {
  const { addItem } = useCart()

  const handleCartAdd = async () => {
    await addItem(productId, quantity)
  }
  return (
    <div className="flex flex-col gap-2 ">
      <div className="flex gap-2 w-full ">
        <div className="w-[54px] h-[54px] border-2 rounded-xl flex items-center justify-center border-gray-100">
          <Wishlist />
        </div>
        <Button
          className="bg-white typo-h3 text-strong border-[1px] border-secondary max-w-[247px]"
          onClick={handleCartAdd}
        >
          장바구니
        </Button>
        <Button className="typo-h3 max-w-[247px]">바로구매</Button>
      </div>
    </div>
  )
}
