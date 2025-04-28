'use client'
import { useCart } from '@/hooks/useCart'
import Button from '../common/Button/Button'
import { getCartItem } from '@/util/cartStorage'
import { useEffect, useState } from 'react'
import {
  CartDetailResponse,
  cartStorageType,
  cartUserPurchaseOrderType,
} from '@/types/cart/cartType'
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
import { purchaseOrders } from '@/services/purchaseService'
import { ROUTES } from '@/constants/routes'
import NonUserWishDialog from '../dialog/NonUserWishDialog'

interface CartWishlistButtonsProps {
  productDetailId: number
  isWished: boolean
}

export const CartWishlistButtons = ({ productDetailId, isWished }: CartWishlistButtonsProps) => {
  const [localItem, setLocalItem] = useState<cartStorageType[]>([])
  const router = useRouter()
  const { isLoggedIn } = useAuthStore()
  const [purchasesOpen, setPurchaseIsOpen] = useState(false)
  const [cartIsOpen, setCartIsOpen] = useState(false)
  const { guestAddItem, userAddItem, checkGuestItemExists } = useCart({ user: isLoggedIn })
  const { getQuantity, setProductId, productId, productOptions } = productStore()
  const [CartItem, setCartItem] = useState<CartDetailResponse>()
  const [isExistingItem, setIsExistingItem] = useState(false)
  const [isWish, setIsWish] = useState(isWished)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const stringProductId = String(productDetailId)
  const numberProductId = productDetailId as number

  let orderItems: cartUserPurchaseOrderType[] = []
  if (productOptions && productOptions.length > 0) {
    orderItems = productOptions.map((option) => ({
      saleProductId: Number(option.id),
      quantity: getQuantity(String(option.id)),
    }))
  } else {
    // 옵션이 없을 경우 기본 상품 추가
    orderItems = [
      {
        saleProductId: Number(numberProductId),
        quantity: getQuantity(stringProductId),
      },
    ]
  }

  // 찜하기
  const { mutate: wishMutate } = useDataMutation(
    async (pId: number) => await addToWishlist(pId),
    () => {
      setIsWish(!isWish)
      SnackBar({
        content: isWish ? '위시리스트에서 제거되었어요' : '위시리스트에 추가되었어요 🧡',
        onClickActionBtn: isWish
          ? undefined
          : () => {
              router.push(ROUTES.WISHLIST)
            },
      })
    },
  )
  const handleAddToCart = async () => {
    try {
      if (isLoggedIn) {
        //장바구니 상품 추가 회원
        const itemsWithForced = orderItems.map((item) => ({
          ...item,
          isForced: false,
        }))
        const response = await userAddItem(itemsWithForced)
        setCartItem(response)
        if (response) {
          const forcedItems = itemsWithForced.map((item) => ({
            ...item,
            isForced: true,
          }))
          if (response.isExisted) {
            await userAddItem(forcedItems)
          }
        }
      } else {
        const { exists, items } = checkGuestItemExists(numberProductId)
        setLocalItem(items)
        setIsExistingItem(exists)
        if (!exists) {
          guestAddItem(orderItems)
        }
      }
    } catch (error) {
      console.error(
        '장바구니 추가 실패:',
        error instanceof Error ? error.message : '알 수 없는 오류',
      )
    }
  }

  const handleProductsDetailPopular = async () => {
    const KEY = 'guestCart'
    // 회원과 비회원 구분
    try {
      if (isLoggedIn) {
        const response = await purchaseOrders([], isLoggedIn, orderItems)
        const orderItemsParam = encodeURIComponent(JSON.stringify(orderItems))
        if (response) router.push(`${ROUTES.PURCHASE}?orderItems=${orderItemsParam}`)
      } else {
        const getItem = getCartItem(KEY)
        if (getItem) {
          try {
            const items = JSON.parse(getItem)
            setLocalItem(items)
          } catch (error) {
            console.error('장바구니 데이터 파싱 오류:', error)
          }
        }
        await guestAddItem(orderItems)
      }
    } catch (error) {
      console.error('장바구니 추가 실패:', error)
    }
  }

  const handleModalGuestPurchase = () => {
    router.push(`${ROUTES.LOGIN}?guest=guestOrder`)
  }

  const handleToCart = () => {
    router.push(ROUTES.CART)
  }

  useEffect(() => {
    if (setProductId && productId !== undefined) setProductId(numberProductId)
  }, [setProductId, productId])

  const handleClickWish = () => {
    if (isLoggedIn) {
      wishMutate(productDetailId)
    } else {
      // 로그인 모달 표시
      setShowLoginModal(true)
    }
  }
  //modal 중복 상품 추가 함수
  const handleDuplicateCart = async () => {
    try {
      if (isLoggedIn) {
        // 회원인 경우 - 실제로 장바구니에 상품 추가
        if (isExistingItem) {
          // 이미 존재하는 상품인 경우 수량 증가
          // 해당 값도 배열로 수정
          //장바구니 상품 추가 회원
          const forcedItems = orderItems.map((item) => ({
            ...item,
            isForced: true,
          }))
          await userAddItem(forcedItems)
        } else {
          const itemsWithForced = orderItems.map((item) => ({
            ...item,
            isForced: false,
          }))
          // 새 상품인 경우 추가
          await userAddItem(itemsWithForced)
        }
      } else {
        // 비회원인 경우 - 실제로 장바구니에 상품 추가
        guestAddItem(orderItems)
      }
      // 모달 닫기
      setCartIsOpen(false)
    } catch (error) {
      console.error(
        '장바구니 추가 실패:',
        error instanceof Error ? error.message : '알 수 없는 오류',
      )
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
          <Dialog open={cartIsOpen} onOpenChange={setCartIsOpen}>
            <DialogTrigger asChild>
              <Button variant={'outline'} size="lg" onClick={handleAddToCart}>
                장바구니
              </Button>
            </DialogTrigger>
            <DialogContent
              className="flex flex-col justify-center items-center w-[500px]"
              needClose
            >
              <DialogHeader className="px-8 pt-8">
                <DialogTitle>
                  {isLoggedIn ? (
                    CartItem?.isExisted ? (
                      <div className="flex flex-col">
                        <span className="typo-body3">이미 장바구니에 담긴 상품이에요.</span>
                        <span className="typo-body3 text-center w-full">수량을 추가할까요?</span>
                      </div>
                    ) : (
                      <div className="flex flex-col">
                        <span className="typo-body3">선택하신 상품이 장바구니에 추가되었어요.</span>
                      </div>
                    )
                  ) : localItem.some(
                      (item: cartStorageType) => String(item.id) === String(productId),
                    ) ? (
                    <div className="flex flex-col">
                      <span className="typo-body3">이미 장바구니에 담긴 상품이에요.</span>
                      <span className="typo-body3 text-center w-full">수량을 추가할까요?</span>
                    </div>
                  ) : (
                    <div className="flex flex-col">
                      <span className="typo-body3">선택하신 상품이 장바구니에에 추가되었어요.</span>
                    </div>
                  )}
                </DialogTitle>
              </DialogHeader>
              <DialogFooter className="w-full flex gap-2.5">
                {/* 상품이 존재할 경우 취소/추가 버튼, 존재하지 않을 경우 확인 버튼 */}
                {(isLoggedIn && CartItem?.isExisted) ||
                (!isLoggedIn &&
                  localItem.some(
                    (item: cartStorageType) => String(item.id) === String(productId),
                  )) ? (
                  <>
                    <Button variant={'outline'} size={'lg'} onClick={() => setCartIsOpen(false)}>
                      취소하기
                    </Button>
                    <Button variant={'secondary'} size={'lg'} onClick={handleDuplicateCart}>
                      추가하기
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant={'outline'} size={'lg'} onClick={() => setCartIsOpen(false)}>
                      쇼핑 계속하기
                    </Button>
                    <Button variant={'secondary'} size={'lg'} onClick={handleToCart}>
                      장바구니로 이동
                    </Button>
                  </>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
          {isLoggedIn ? (
            <Button variant={'secondary'} size={'lg'} onClick={handleProductsDetailPopular}>
              바로구매
            </Button>
          ) : (
            <Dialog open={purchasesOpen} onOpenChange={setPurchaseIsOpen}>
              <DialogTrigger asChild>
                <Button variant={'secondary'} size={'lg'} onClick={handleProductsDetailPopular}>
                  바로구매
                </Button>
              </DialogTrigger>
              <DialogContent
                className="flex flex-col justify-center items-center w-[576px]"
                needClose
              >
                <DialogHeader>
                  <span className="typo-body3 pt-6 line-clamp-2 text-center">
                    회원가입하고 더 많은 혜택을 누려보세요! 로그인 하시겠어요?
                  </span>
                </DialogHeader>
                <DialogFooter className="w-full flex gap-2.5">
                  <Button variant={'outline'} size={'lg'} onClick={handleModalGuestPurchase}>
                    비회원 구매
                  </Button>
                  <Button
                    variant={'secondary'}
                    size={'lg'}
                    onClick={() => router.push(ROUTES.LOGIN)}
                  >
                    로그인하기
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
