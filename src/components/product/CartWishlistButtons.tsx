'use client'
import { useCart } from '@/hooks/useCart'
import Button from '../common/Button/Button'
import Wishlist from '/public/icons/wishlist.svg?svgr'
import { getCartItem } from '@/util/cartStorage'
import { useEffect, useState } from 'react'
import { cartStorageType } from '@/types/cart/cartType'
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
} from '../common/Dialog/Dialog'
import { useRouter } from 'next/navigation'
import { productStore } from '@/stores/productStore'

interface ProductProps {
  productId: number
  quantity?: number
}

export const CartWishlistButtons = ({ productId }: ProductProps) => {
  const [localItem, setLocalItem] = useState([])
  const router = useRouter()
  const { guestAddItem, userAddItem } = useCart()
  const user = true
  const { quantity, setProductId } = productStore()

  // 장바구니 추가 통합 함수
  const handleAddToCart = async () => {
    try {
      if (user) {
        await userAddItem(productId, quantity)
      } else {
        // 비회원일 때 처리
        const getItem = getCartItem('guestCart')
        if (getItem) {
          try {
            const items = JSON.parse(getItem)
            setLocalItem(items)
          } catch (error) {
            console.error('장바구니 데이터 파싱 오류:', error)
          }
        }
        await guestAddItem(productId, quantity)
      }
    } catch (error) {
      console.error('장바구니 추가 실패:', error)
    }
  }
  const goToCart = () => {
    router.push('/cart')
  }
  useEffect(() => {
    if (setProductId && productId !== undefined) setProductId(productId)
  }, [])

  return (
    <>
      <div className="flex gap-2 bg-primary">
        <div className="w-[54px] h-[54px] border-2 rounded-xl flex items-center justify-center border-gray-100">
          <Wishlist />
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={'outline'} size="lg" onClick={handleAddToCart}>
              장바구니
            </Button>
          </DialogTrigger>
          <DialogContent className="flex flex-col justify-center items-center w-full">
            <DialogHeader>
              <DialogTitle>
                {localItem.some((item: cartStorageType) => String(item.id) === String(productId))
                  ? '장바구니에 상품이 이미 존재 합니다.'
                  : '장바구니에 상품이 추가 되었습니다.'}
              </DialogTitle>
              <Button variant={'secondary'} size={'lg'} onClick={goToCart}>
                장바구니로 이동
              </Button>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <Button variant={'secondary'} size={'lg'}>
          바로구매
        </Button>
      </div>
    </>
  )
}
