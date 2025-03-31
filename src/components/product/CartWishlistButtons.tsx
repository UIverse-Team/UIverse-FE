'use client'

import { useCart } from '@/hooks/useCart'
import Button from '../common/Button/Button'
import { getCartItem } from '@/util/cartStorage'
import { useEffect, useState } from 'react'
import { cartStorageType } from '@/types/cart/cartType'
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
import useDataMutation from '@/hooks/useDataMutation'
import SnackBar from '../common/SnackBar/SnackBar'
import { useAuthStore } from '@/stores/user'
import WishOnIcon from '/public/icons/wishlist-on.svg?svgr'
import WishOffIcon from '/public/icons/wishlist-off.svg?svgr'
import { addToWishlist } from '@/services/wishService'
import Divider from '../common/Divider/Divider'
import { ROUTES } from '@/constants/routes'
import NonUserWishDialog from '../dialog/NonUserWishDialog'

interface CartWishlistButtonsProps {
  productId: number
  isWished: boolean
}

export const CartWishlistButtons = ({ productId, isWished }: CartWishlistButtonsProps) => {
  const [localItem, setLocalItem] = useState<cartStorageType[]>([])
  const router = useRouter()
  const { isLoggedIn } = useAuthStore()
  const [isOpen, setIsOpen] = useState(false)
  const { guestAddItem, userAddItem } = useCart({ user: isLoggedIn })
  const { quantity, setProductId } = productStore()

  const [isWish, setIsWish] = useState(isWished)
  const [showLoginModal, setShowLoginModal] = useState(false)

  // 찜하기
  const { mutate: wishMutate } = useDataMutation(
    async (pId: number) => await addToWishlist(pId),
    () => setIsWish(!isWish),
  )

  // 장바구니 추가 통합 함수
  const handleAddToCart = async () => {
    try {
      if (isLoggedIn) {
        await userAddItem(productId, quantity)
      } else {
        // 비회원일 때 처리
        const getItem = getCartItem('guestCart')
        if (getItem) {
          try {
            const items = JSON.parse(getItem)
            setLocalItem(items)
          } catch (error) {
            console.error(
              '장바구니 데이터 파싱 오류:',
              error instanceof Error ? error.message : '알 수 없는 오류',
            )
          }
        }
        guestAddItem(productId, quantity)
      }
    } catch (error) {
      console.error(
        '장바구니 추가 실패:',
        error instanceof Error ? error.message : '알 수 없는 오류',
      )
    }
  }

  const goToCart = () => {
    router.push(ROUTES.CART)
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
    router.push(`${ROUTES.LOGIN}?guest=guestOrder`)
  }

  useEffect(() => {
    if (setProductId && productId !== undefined) setProductId(productId)
  }, [setProductId, productId])

  const handleClickWish = () => {
    if (isLoggedIn) {
      wishMutate(productId)
      SnackBar({
        content: isWish ? '위시리스트에서 제거되었어요' : '위시리스트에 추가되었어요 🧡',
        onClickActionBtn: isWish
          ? undefined
          : () => {
              router.push(ROUTES.WISHLIST)
            },
      })
    } else {
      // 로그인 모달 표시
      setShowLoginModal(true)
    }
  }

  return (
    <>
      <div className="space-y-8">
        <div className="flex gap-2">
          <div className="border rounded-sm border-alter-line">
            <IconButton
              className="size-[54px] flex justify-center items-center"
              onClick={handleClickWish}
            >
              {isWish && !Array.isArray(isWish) ? (
                <WishOnIcon className="size-10 text-primary" />
              ) : (
                <WishOffIcon className="size-10 text-disabled" />
              )}
            </IconButton>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={'outline'} size="lg" onClick={handleAddToCart}>
                장바구니
              </Button>
            </DialogTrigger>
            <DialogContent className="flex flex-col justify-center items-center w-full">
              <DialogHeader className="px-8 pt-8">
                <DialogTitle className="typo-h3">
                  {localItem.some(
                    (item: cartStorageType) => String(item.id) === String(productId),
                  ) && '어랏? 그 상품, 이미 담아두셨네요!'}
                  <Divider />
                </DialogTitle>
                <Button variant={'secondary'} size={'lg'} onClick={goToCart}>
                  장바구니로 이동
                </Button>
                <span className="typo-body2">
                  이 상품이 이미 장바구니에 있어요! 수량을 추가할까요?
                </span>
              </DialogHeader>
              <DialogFooter className="w-full p-8 flex gap-2.5">
                <Button variant={'outline'} size={'lg'}>
                  취소하기
                </Button>
                <Button variant={'secondary'} size={'lg'}>
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
                  <DialogTitle className="typo-h3 pb-6 text-center">
                    로그인하고 더 빠르게 결제하세요!
                  </DialogTitle>
                  <Divider />
                  <span className="typo-body2 pt-6 line-clamp-2 text-center">
                    로그인하면 배송 정보 입력 없이 더 빠르게 결제할 수 있어요!비회원으로도 구매할 수
                    있지만, 주문 내역을 확인하려면 로그인하는 게 더 편리해요.
                  </span>
                </DialogHeader>
                <DialogFooter className="w-full flex gap-2.5">
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

      <NonUserWishDialog isOpen={showLoginModal} onOpenChange={setShowLoginModal} />
    </>
  )
}
