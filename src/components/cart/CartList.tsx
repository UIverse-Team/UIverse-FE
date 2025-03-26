'use client'
/**
 * 비회원 시 localstorage 삭제 상품 id를 통해 상품 정보 목록 가져오기
 * 회원 시 db에 저장하고 있기 때문에 프론트에서 저장할 필요가 없나?
 * 이미 존재하는 상품을 확인해서 수량 값을 계속 더 해서 보여줘야 함.
 * 그렇다면 프론트에서도 장바구니 상품에 대한 정보를 가지고 있어야 하는가?
 */
import React from 'react'
import { CartItemActions } from './CartItemActions'
import { CartType } from '@/types/cart/cartType'
import { CartItemHeader } from './CartItemHeader'
import { CartItemList } from './CartItemList'
import { CartProductList } from './CartProductList'
import { EmptyCartMessage } from './EmptyCartMessage'

import { useCart } from '@/hooks/useCart'

interface CartListProps {
  cartItems: CartType[]
  user: boolean
  setCartItems?: React.Dispatch<React.SetStateAction<CartType[]>>
}

export const CartList = ({ cartItems, user, setCartItems }: CartListProps) => {
  const {
    toggleHandleSelectAll,
    handleDeleteCartItem,
    handleSelectItem,
    selectedItems,
    selectAll,
    handleDetelteSelectedItems,
  } = useCart({ cartItems, setCartItems })

  const cartLength = React.useMemo(() => {
    if (!Array.isArray(cartItems)) return 0

    return cartItems.reduce((total, cart) => {
      const itemCount = Array.isArray(cart.cartDetailResponseList)
        ? cart.cartDetailResponseList.length
        : 0
      return total + itemCount
    }, 0)
  }, [cartItems])

  if (cartLength === 0) {
    return <EmptyCartMessage />
  }
  return (
    <section className=" flex flex-col gap-4 rounded-2xl basis-full">
      <div className="flex flex-col rounded-2xl bg-white">
        <CartItemHeader onSelectAll={selectAll} onHandleSelectAll={toggleHandleSelectAll} />
        {cartItems?.map((cart) =>
          cart.cartDetailResponseList?.map((item, index) => (
            <CartItemList
              onItem={item}
              onIndex={index}
              onCart={cart}
              onHandleSelectItem={handleSelectItem}
              // x눌렀을 때
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

      <CartProductList />
    </section>
  )
}
