'use client'
import { useCart } from '@/hooks/useCart'
import Button from '../common/Button/Button'
import Wishlist from '/public/icons/wishlist.svg?svgr'
import { getCartItem } from '@/util/cartStorage'
import { useEffect, useState } from 'react'
import { CartDetailResponse, cartStorageType } from '@/types/cart/cartType'
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
  DialogFooter,
} from '../common/Dialog/Dialog'
import { useRouter } from 'next/navigation'
import { productStore } from '@/stores/productStore'
import IconButton from '../common/Button/IconButton'
import { useAuthStore } from '@/stores/user'
import Divider from '../common/Divider/Divider'

interface ProductProps {
  productId: number
  quantity?: number
}

export const CartWishlistButtons = ({ productId }: ProductProps) => {
  const [localItem, setLocalItem] = useState([])
  const router = useRouter()
  const { isLoggedIn } = useAuthStore()
  const [isOpen, setIsOpen] = useState(false)
  const { guestAddItem, userAddItem } = useCart({ user: isLoggedIn })
  const { quantity, setProductId } = productStore()
  // const [userCartItems, setUserCartItems] = useState<CartType>({
  //   cartDetailResponseList: [],
  //   totalItems: 0,
  //   totalOrderPrice: 0,
  //   totalDiscountPrice: 0,
  //   totalPaymentPrice: 0,
  // })

  // 장바구니 추가 통합 함수
  const handleAddToCart = async () => {
    try {
      if (isLoggedIn) {
        const response: CartDetailResponse = await userAddItem(productId, quantity)
        //isExisted이면 true이면 이미 존재하는 상품
        console.log(response)
        if (response.isExisted) {
          const response: CartDetailResponse = await userAddItem(productId, quantity, true)
          console.log(response)
        }
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

  const handleProductsDetailPopular = async () => {
    try {
      if (isLoggedIn) {
        // await userAddItem(productId, quantity)
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

  const handleModalGuestPurchase = () => {
    router.push(`/login?guest=guestOrder`)
  }

  useEffect(() => {
    if (setProductId && productId !== undefined) setProductId(productId)
  }, [])

  return (
    <>
      <div className="space-y-8">
        <div className="flex gap-2">
          <div className="border rounded-sm border-alter-line">
            <IconButton className="w-[54px] h-[54px] flex justify-center items-center">
              <Wishlist className="w-10 h-10" />
            </IconButton>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={'outline'} size="lg" onClick={handleAddToCart}>
                장바구니
              </Button>
            </DialogTrigger>
            <DialogContent className="flex flex-col justify-center items-center w-[576px]">
              <DialogHeader className="px-8 pt-8">
                <DialogTitle>
                  {isLoggedIn ? (
                    <>회원</>
                  ) : (
                    localItem.some(
                      (item: cartStorageType) => String(item.id) === String(productId),
                    ) && <h1 className="typo-h3">어랏? 그 상품, 이미 담아두셨네요!</h1>
                  )}

                  <Divider />
                </DialogTitle>
                <Button variant={'secondary'} size={'lg'} onClick={goToCart}>
                  장바구니로 이동
                </Button>
                <span className="typo-body2 pt-6 line-clamp-2 text-center">
                  이 상품이 이미 장바구니에 있어요!
                </span>
                <span className="typo-body2 justify-center flex w-full ">수량을 추가할까요?</span>
              </DialogHeader>
              <DialogFooter className="flex gap-2.5">
                <Button variant={'outline'} size={'lg'}>
                  취소하기
                </Button>
                <Button variant={'secondary'} size={'lg'} onClick={handleAddToCart}>
                  추가하기
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          {isLoggedIn ? (
            <Button variant={'secondary'} size={'lg'} onClick={handleProductsDetailPopular}>
              바로구매
            </Button>
          ) : (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button variant={'secondary'} size={'lg'} onClick={handleProductsDetailPopular}>
                  바로구매
                </Button>
              </DialogTrigger>
              <DialogContent className="flex flex-col justify-center items-center w-[576px]">
                <DialogHeader>
                  <DialogTitle className="pb-6 text-center">
                    로그인하고 더 빠르게 결제하세요!
                  </DialogTitle>
                  <Divider />
                  <span className="typo-body2 pt-6 line-clamp-2 text-center">
                    로그인하면 배송 정보 입력 없이 더 빠르게 결제할 수 있어요!비회원으로도 구매할 수
                    있지만, 주문 내역을 확인하려면 로그인하는 게 더 편리해요.
                  </span>
                </DialogHeader>
                <DialogFooter className="flex gap-2.5">
                  <Button variant={'outline'} size={'lg'}>
                    재입고 알림 신청
                  </Button>
                  <Button variant={'secondary'} size={'lg'} onClick={handleModalGuestPurchase}>
                    알겠어요
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </>
  )
}
