'use client'
/**
 * 비회원 시 localstorage 삭제 상품 id를 통해 상품 정보 목록 가져오기
 * 회원 시 db에 저장하고 있기 때문에 프론트에서 저장할 필요가 없나?
 * 이미 존재하는 상품을 확인해서 수량 값을 계속 더 해서 보여줘야 함.
 * 그렇다면 프론트에서도 장바구니 상품에 대한 정보를 가지고 있어야 하는가?
 */
import { getCartItem, saveCartItem } from '@/util/cartStorage'
// import HttpClient from '@/util/httpClient'
import { useState } from 'react'
import { CartItemActions } from './CartItemActions'
// import { Product } from '@/types/Product/productType'
import { cartStroageType, CartType } from '@/types/cart/cartType'
import { CartItemHeader } from './CartItemHeader'
import { CartItemList } from './CartItemList'
import { CartProductList } from './CartProductList'
import { EmptyCartMessage } from './EmptyCartMessage'
import { useCart } from '@/hooks/useCart'

interface CartListProps {
  cartListItems: CartType[]
  user: boolean
}

export const CartList = ({ cartListItems, user }: CartListProps) => {
  const [cartItems, setCartItems] = useState<CartType[]>(cartListItems) //상품 정보 데이터
  // const [selectedItems, setSelectedItems] = useState<string[]>([])
  // const [selectAll, setSelectAll] = useState(false)
  const KEY = 'guestCart'
  const get = getCartItem(KEY)

  const {
    toggleHandleSelectAll,
    userDeleteCartItems,
    handleDeleteCartItem,
    handleSelectItem,
    selectedItems,
    selectAll,
    setSelectedItems,
    setSelectAll,
  } = useCart({ initialCartItems: cartItems || [], user })
  //상품 선택
  // const handleSelectItem = (id: string) => {
  //   if (selectedItems.includes(id)) {
  //     setSelectedItems(selectedItems.filter((itemId) => itemId !== id))
  //     setSelectAll(false)
  //   } else {
  //     // 선택되지 않은 상품이면 선택 추가
  //     setSelectedItems([...selectedItems, id])
  //   }
  // }
  // const handleDeleteCartItem = (productId: number, isUser: boolean) => {
  //   if (isUser) {
  //     // 회원일 때 - 단일 ID를 배열로 변환하여 처리
  //     deleteCartItems([String(productId)])
  //   } else {
  //     // 비회원일 때
  //     deleteCartItemLocalStorage(productId)

  //     // 상품 상태 업데이트
  //     setCartItems((prevItems) =>
  //       prevItems
  //         .map((item) => ({
  //           ...item,
  //           cartDetailResponseList: item.cartDetailResponseList.filter(
  //             (value) => value.cartId !== productId,
  //           ),
  //         }))
  //         .filter((item) => item.cartDetailResponseList.length > 0),
  //     )
  //   }
  // }

  // localstorage 상품 삭제
  // const deleteCartItemLocalStorage = (productId: number) => {
  //   const localCartItems = getCartItem(KEY)
  //   if (localCartItems) {
  //     const parsedItems = JSON.parse(localCartItems)
  //     const updatedItems = parsedItems.filter((item: Product) => item.id !== productId)
  //     saveCartItem(KEY, JSON.stringify(updatedItems))
  //   }
  // }

  // 회원 시
  //정상 작동
  // const deleteCartItems = async (selectedItems: string[]) => {
  //   try {
  //     await HttpClient.delete(`/carts`, {
  //       data: { cartIdList: selectedItems },
  //     })
  //     console.log(selectedItems)
  //     setCartItems((prevItems) =>
  //       prevItems.filter((item) => {
  //         item.cartDetailResponseList = item.cartDetailResponseList.filter(
  //           (value) => !selectedItems.includes(String(value.cartId)),
  //         )

  //         return item.cartDetailResponseList.length > 0
  //       }),
  //     )
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }
  // 선택 삭제 버튼 함수
  const handleDetelteSelectedItems = (selectedItems: string[]) => {
    if (user) {
      userDeleteCartItems(selectedItems)
      setSelectAll(false)
    } else {
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
      }
      setSelectedItems([])
      setSelectAll(false)
    }
  }

  return (
    <section className="flex-1  flex flex-col gap-4 rounded-2xl">
      {get?.length === undefined ? (
        <EmptyCartMessage />
      ) : (
        <>
          <div className="flex flex-col gap-6 p-4 bg-white rounded-2xl ">
            <CartItemHeader onSelectAll={selectAll} onHandleSelectAll={toggleHandleSelectAll} />
            {cartItems.map((cart) =>
              cart.cartDetailResponseList?.map((item, index) => (
                <CartItemList
                  onItem={item}
                  onIndex={index}
                  onCart={cart}
                  onHandleSelectItem={handleSelectItem}
                  onHandleDeleteCartItem={handleDeleteCartItem}
                  key={item.cartId}
                  onSelectedItems={selectedItems}
                  user={user}
                />
              )),
            )}
            <CartItemActions
              onSelectCheckClick={handleDetelteSelectedItems}
              onSelectedItems={selectedItems}
            />
          </div>
        </>
      )}
      <CartProductList />
    </section>
  )
}
