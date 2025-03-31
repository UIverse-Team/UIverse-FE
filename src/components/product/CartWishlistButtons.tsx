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
import { getPurchaseService } from '@/services/purchaseService'

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
  const [CartItem, setCartItem] = useState<CartDetailResponse>()

  const handleAddToCart = async () => {
    try {
      if (isLoggedIn) {
        //장바구니 상품 추가 회원
        const response = await userAddItem(productId, quantity)
        setCartItem(response)
        if (response) {
          if (response.isExisted) {
            await userAddItem(productId, quantity, true)
          }
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

  const handleProductsDetailPopular = async () => {
    // 회원과 비회원 구분
    try {
      if (isLoggedIn) {
        await getPurchaseService(productId, quantity)
        router.push(`/purchase?saleProductId=${productId}&quantity=${quantity}`)
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
                  {/* 상품 존재 여부에 따라 다른 제목 표시 */}
                  {isLoggedIn
                    ? CartItem?.isExisted
                      ? '어랏? 그 상품, 이미 담아두셨네요!'
                      : '상품이 장바구니에 추가되었습니다'
                    : localItem.some(
                          (item: cartStorageType) => String(item.id) === String(productId),
                        )
                      ? '어랏? 그 상품, 이미 담아두셨네요!'
                      : '상품이 장바구니에 추가되었습니다'}
                  <Divider />
                </DialogTitle>

                {/* 상품이 존재할 경우 */}
                {(isLoggedIn && CartItem?.isExisted) ||
                (!isLoggedIn &&
                  localItem.some(
                    (item: cartStorageType) => String(item.id) === String(productId),
                  )) ? (
                  <>
                    <span className="typo-body2 pt-6 line-clamp-2 text-center">
                      이 상품이 이미 장바구니에 있어요!
                    </span>
                    <span className="typo-body2 justify-center flex w-full">
                      수량을 추가할까요?
                    </span>
                  </>
                ) : (
                  // 상품이 존재하지 않을 경우
                  <></>
                )}
              </DialogHeader>
              <DialogFooter className="flex gap-2.5">
                {/* 상품이 존재할 경우 취소/추가 버튼, 존재하지 않을 경우 확인 버튼 */}
                {(isLoggedIn && CartItem?.isExisted) ||
                (!isLoggedIn &&
                  localItem.some(
                    (item: cartStorageType) => String(item.id) === String(productId),
                  )) ? (
                  <>
                    <Button variant={'outline'} size={'lg'}>
                      취소하기
                    </Button>
                    <Button variant={'secondary'} size={'lg'} onClick={handleAddToCart}>
                      추가하기
                    </Button>
                  </>
                ) : (
                  <Button variant={'secondary'} size={'lg'} onClick={handleAddToCart}>
                    장바구니로 이동
                  </Button>
                )}
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
