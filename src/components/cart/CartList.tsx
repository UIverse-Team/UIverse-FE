'use client'
/**
 * 비회원 시 localstorage 삭제 상품 id를 통해 상품 정보 목록 가져오기
 * 회원 시 db에 저장하고 있기 때문에 프론트에서 저장할 필요가 없나?
 * 이미 존재하는 상품을 확인해서 수량 값을 계속 더 해서 보여줘야 함.
 * 그렇다면 프론트에서도 장바구니 상품에 대한 정보를 가지고 있어야 하는가?
 */

import Image from 'next/image'
import Button from '@/components/common/Button/Button'
import { getCartItem, saveCartItem } from '@/util/cartStorage'
import HttpClient from '@/util/httpClient'
import { useState } from 'react'
import { CartItemActions } from './CartItemActions'
import { Product } from '@/types/Product/productType'
import { cartStroageType, CartType } from '@/types/cart/cartType'
import { CartItemHeader } from './CartItemHeader'
import { CartItem } from './CartItemList'

interface CartListProps {
  cartListItems: CartType[]
}

export const CartList = ({ cartListItems }: CartListProps) => {
  const [cartItems, setCartItems] = useState<CartType[]>(cartListItems) //상품 정보 데이터
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [selectAll, setSelectAll] = useState(false)
  const KEY = 'guestCart'
  const get = getCartItem(KEY)
  // const productIds = [1, 2, 3]

  //비회원 일때(임시)
  // const getCartList = async () => {
  //   const cartListData = await HttpClient.get(`/carts/guest?saleProductId=${productIds.join(',')}`)
  //   const data = await cartListData.data
  //   setCartItems(data)
  // }

  //상품 선택
  const handleSelectItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id))
      setSelectAll(false)
    } else {
      // 선택되지 않은 상품이면 선택 추가
      setSelectedItems([...selectedItems, id])
    }
  }

  // x를 선택했을 때 각 물품 삭제
  const handleDeleteCartItem = (productId: number, isLoggedIn: boolean) => {
    if (isLoggedIn) {
      //회원일떄
      deleteCartItem(productId)
    } else {
      //비회원일때
      deleteCartItemLocalStorage(productId)
      setCartItems((prevItems) =>
        prevItems
          .map((item) => ({
            ...item,
            cartDetailResponseList: item.cartDetailResponseList.filter(
              (value) => value.cartId !== productId,
            ),
          }))
          .filter((item) => item.cartDetailResponseList.length > 0),
      )
    }
  }
  // localstorage 상품 삭제
  const deleteCartItemLocalStorage = (productId: number) => {
    const localCartItems = getCartItem(KEY)
    if (localCartItems) {
      const parsedItems = JSON.parse(localCartItems)
      const updatedItems = parsedItems.filter((item: Product) => item.id !== productId)
      saveCartItem(KEY, JSON.stringify(updatedItems))
    }
  }

  // 회원 시
  const deleteCartItem = async (productId: number) => {
    const data = await HttpClient.delete(`/api/guestcarts/${productId}`)
    console.log(data)
    setCartItems((prevItems) =>
      prevItems.filter((item) =>
        item.cartDetailResponseList.filter((value) => value.cartId !== productId),
      ),
    )
  }
  // 선택 삭제 버튼 함수
  const handleDetelteSelectedItems = () => {
    //비회원 일때
    const localCartItems = getCartItem(KEY)
    if (localCartItems) {
      const parsedItems = JSON.parse(localCartItems)

      const updatedItems = parsedItems.filter((item: cartStroageType) => {
        return !selectedItems.includes(String(item.id))
      })
      saveCartItem(KEY, JSON.stringify(updatedItems))
      setCartItems((prevItems) =>
        prevItems
          .map((item) => {
            const updatedDetails = item.cartDetailResponseList.filter(
              (detail) => !selectedItems.includes(String(detail.cartId)),
            )
            return {
              ...item,
              cartDetailResponseList: updatedDetails,
              totalItems: updatedDetails.length,
            }
          })
          .filter((item) => item.cartDetailResponseList.length > 0),
      )
      setSelectedItems([])
      setSelectAll(false)
    }
  }
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([])
      setSelectAll(false)
    } else {
      setSelectedItems(
        cartItems.flatMap((item) =>
          item.cartDetailResponseList.map((value) => String(value.cartId)),
        ),
      )
      setSelectAll(true)
    }
  }

  // useEffect(() => {
  //   getCartList()
  // }, [])

  return (
    //비회원일 경우
    <section className="flex-1  flex flex-col gap-4 rounded-2xl">
      {get?.length === undefined ? (
        <div className="flex flex-col gap-6 p-4 bg-white rounded-2xl items-center h-[285px] justify-center">
          <h1 className="typo-h3 text-strong">장바구니가 비었어요.</h1>
          <span className="typo-caption1 text-alternative">찜한 상품을 다시 확인해보세요</span>
          <Button className="w-[142px] typo-button1 text-strong bg-gray-75">
            찜한상품 바로가기
          </Button>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-6 p-4 bg-white rounded-2xl ">
            <CartItemHeader onSelectAll={selectAll} onHandleSelectAll={handleSelectAll} />
            {cartItems.map((cart) =>
              cart.cartDetailResponseList.map((item, index) => (
                <CartItem
                  onItem={item}
                  onIndex={index}
                  onCart={cart}
                  onHandleSelectItem={handleSelectItem}
                  onHandleDeleteCartItem={handleDeleteCartItem}
                  key={item.cartId}
                  onSelectedItems={selectedItems}
                />
              )),
            )}
            <CartItemActions onSelectCheckClick={handleDetelteSelectedItems} />
          </div>
        </>
      )}

      <div className="flex rounded-2xl p-6 bg-white flex-col gap-2">
        <h1 className="typo-3">맞춤 상품 추천</h1>
        <div className="flex gap-4 ">
          <div className="flex flex-col gap-2 w-[180px]">
            <div className="border-[1px] rounded-2xl  w-[180px] h-[180px] border-alter-line">
              <Image
                src={'https://shopping-phinf.pstatic.net/main_8611157/86111572769.2.jpg'}
                alt="상품 메인 이미지"
                style={{ objectFit: 'cover' }}
                className="rounded-xl"
                width={180}
                height={180}
              />
            </div>
            <div>
              <h3 className="typo-caption1">조르지오아르마니</h3>
            </div>
            <div>
              <span className="typo-button2 overflow-hidden text-ellipsis w-full line-clamp-2">
                조르지오아르마니 아이섀도우 아이 틴트 롱래스팅 리퀴드 아이새도 아르마니 뷰티 색조
                메이크업 화장품 6종
              </span>
            </div>
            <div className="flex gap-2">
              <h3 className="typo-h3 text-sale">49%</h3>
              <h3 className="typo-h3">13,560원</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
