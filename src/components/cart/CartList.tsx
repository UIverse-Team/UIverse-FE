'use client'
/**
 * 비회원 시 localstorage 삭제 상품 id를 통해 상품 정보 목록 가져오기
 * 회원 시 db에 저장하고 있기 때문에 프론트에서 저장할 필요가 없나?
 * 이미 존재하는 상품을 확인해서 수량 값을 계속 더 해서 보여줘야 함.
 * 그렇다면 프론트에서도 장바구니 상품에 대한 정보를 가지고 있어야 하는가?
 */

import { NumbericFiled } from '@/components/common/numbericFiled/NumbericFiled'
import Checkbox from '@/components/common/Checkbox/Checkbox'
import Image from 'next/image'
import Button from '@/components/common/Button/Button'
import Close from '/public/icons/close.svg?svgr'
import { getCartItem, saveCartItem } from '@/util/cartStorage'
import HttpClient from '@/util/httpClient'
import { useEffect, useState } from 'react'
import { CartItemActions } from './CartItemActions'
import { Product } from '@/types/Product/Product'
import formatKoreanWon from '@/util/formatKoreanWon'
import { CartType } from '@/types/cart/Cart'
// import formatKoreanWon from '@/util/formatKoreanWon'

interface CartListProps {
  cartListItems: CartType[]
}

export const CartList = ({ cartListItems }: CartListProps) => {
  const [cartItems, setCartItems] = useState<CartType[]>(cartListItems) //상품 정보 데이터
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [selectAll, setSelectAll] = useState(false)
  const KEY = 'guestCart'
  const get = getCartItem(KEY)

  //임시 로그인 상태 확인
  const userId = false

  // console.log(get?.productId)
  const getCartList = async () => {
    const cartListData = await HttpClient.get(`/guestcarts`)
    const data = await cartListData.data
    setCartItems(data)
  }

  const handleSelectItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((id) => id !== id))
      // setSelectAll(false)
    } else {
      // 선택되지 않은 상품이면 선택 추가
      setSelectedItems([...selectedItems, id])
      // 모든 상품이 선택되었는지 확인
      // if (selectedItems.length + 1 === cartItems.length) {
      //   setSelectAll(true)
      // }
    }
  }

  const handleDeleteCartItem = (productId: number, isLoggedIn: boolean) => {
    if (isLoggedIn) {
      //회원일떄
      deleteCartItem(productId)
    } else {
      console.log(productId)
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

  const handleDetelteSelectedItems = () => {
    //비회원 일때
    const localCartItems = getCartItem(KEY)
    if (localCartItems) {
      const parsedItems = JSON.parse(localCartItems)
      const updatedItems = parsedItems.filter(
        (item: CartType) =>
          !selectedItems.includes(String(item.cartDetailResponseList.map((value) => value.cartId))),
      )
      saveCartItem(KEY, JSON.stringify(updatedItems))

      // 화면에서 선택된 상품 제거
      setCartItems((prevItems) =>
        prevItems.filter(
          (item) =>
            !selectedItems.includes(
              String(item.cartDetailResponseList.map((value) => value.cartId)),
            ),
        ),
      )
      setSelectedItems([])
      // setSelectAll(false)
    }
  }

  const handleSelectAll = () => {
    if (selectAll) {
      // 전체 선택 해제
      setSelectedItems([])
      setSelectAll(false)
    } else {
      // 전체 선택
      setSelectedItems(
        cartItems.flatMap((item) =>
          item.cartDetailResponseList.map((value) => String(value.cartId)),
        ),
      )
    }
    setSelectAll(true)
  }

  useEffect(() => {
    getCartList()
  }, [])

  console.log(cartItems)
  console.log(selectAll)
  return (
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
          <div className="flex flex-col gap-6 p-4 bg-white rounded-2xl">
            <div className="border-b-[2px] border-alter-line h-[73px] items-center flex justify-around">
              <div>
                <Checkbox checked={selectAll} onClick={handleSelectAll} />
              </div>
              <div className="flex gap-2">상품정보</div>
              <div className="flex gap-2">수량</div>
              <div className="flex gap-2">주문 금액</div>
            </div>
            {cartItems.map((cart) =>
              cart.cartDetailResponseList.map((item) => (
                <div className="flex flex-col gap-4" key={item.cartId}>
                  <div className="flex gap-2">
                    <div>
                      <Checkbox
                        checked={selectedItems.includes(item.cartId.toString())}
                        onChange={() => handleSelectItem(item.cartId.toString())}
                      />
                    </div>
                    <div className="flex items-center w-full justify-around">
                      <div className="flex gap-4 ">
                        <div>
                          <Image
                            src={item.image}
                            width={138}
                            height={138}
                            alt="상품 이미지"
                            style={{ objectFit: 'cover' }}
                            className="rounded-xl"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <h3 className="typo-caption1 text-alternative">브랜드명</h3>
                          <div>
                            <h1 className="line-clamp-2 overflow-hidden text-ellipsis typo-button1 w-60">
                              {item.productName}
                            </h1>
                          </div>
                          <span className="typo-caption1 text-gray-800">
                            {item.optionName} / 수량 {item.quantity}개
                          </span>
                          <span className="typo-caption1">
                            무료배송{' '}
                            <span className="text-positive typo-caption1">03/18(화) 출발 예정</span>
                          </span>
                        </div>
                      </div>
                      <div>
                        <NumbericFiled />
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex flex-col items-end">
                          {/* 할인 전 가격 정보가 없으므로 필요한 경우 추가 */}
                          <h3 className="typo-h3">{formatKoreanWon(item.price, false)}원</h3>
                        </div>
                        <Button className="w-[83px] h-[43px]">바로구매</Button>
                      </div>
                    </div>
                    <div className="flex">
                      <Close onClick={() => handleDeleteCartItem(item.cartId, userId)} />
                    </div>
                  </div>
                </div>
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
