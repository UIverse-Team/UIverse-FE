'use client'
import { useCart } from '@/hooks/useCart'
import Button from '../common/Button/Button'
import Wishlist from '/public/icons/wishlist.svg?svgr'
// import { Dialog, DialogTrigger } from '../common/Dialog/Dialog'
import { getCartItem } from '@/util/cartStorage'
import { useState } from 'react'
import { cartStroageType } from '@/types/cart/cartType'
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
} from '../common/Dialog/Dialog'
import { useRouter } from 'next/navigation'
// import { Product } from '@/types/Product/Product'

interface ProductProps {
  productId: number
  quantity: number
}

export const CartWishlistButtons = ({ productId, quantity }: ProductProps) => {
  const [hasCartItems, setHasCartItems] = useState(false)
  const router = useRouter()
  const { addItem } = useCart()
  //비회원일 때

  const handleCartAdd = async () => {
    await addItem(productId, quantity)
    const getItem = getCartItem('guestCart')
    if (getItem) {
      const item = JSON.parse(getItem)
      // item과 같은 상품이 있다면 modal에서 다르게 처리해주기
      const isProductInCart = item.some(
        (item: cartStroageType) => String(item.id) === String(productId),
      )
      //localstorage에 상품이 존재
      if (isProductInCart) setHasCartItems(true)
    }
  }

  return (
    <>
      <div className="flex flex-col gap-2 ">
        <div className="flex gap-2 w-full ">
          <div className="w-[54px] h-[54px] border-2 rounded-xl flex items-center justify-center border-gray-100">
            <Wishlist />
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="bg-white typo-h3 text-strong border-[1px] border-secondary max-w-[247px]"
                onClick={handleCartAdd}
              >
                장바구니
              </Button>
            </DialogTrigger>
            <DialogContent className="flex flex-col justify-center items-center w-full">
              <DialogHeader>
                <DialogTitle>
                  {hasCartItems
                    ? '장바구니에 상품이 이미 존재 합니다.'
                    : '장바구니에 상품이 추가 되었습니다.'}
                </DialogTitle>
                <Button
                  className="bg-white typo-h3 text-strong border-[1px] border-secondary "
                  onClick={() => router.push('/cart')}
                >
                  장바구니로 이동
                </Button>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <Button className="typo-h3 max-w-[247px]">바로구매</Button>
        </div>
      </div>
    </>
  )
}
