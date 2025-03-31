import { PurchasePageData } from '@/types/purchase/purchaseType'
import { getCartItem, saveCartItem } from '@/util/cartStorage'
import type { CartDetailResponse, cartStorageType, CartType } from '@/types/cart/cartType'
import type { ProductDetail } from '@/types/Product/productDetailType'
import { createEndpoint } from '@/libs/axios/endPoints'
import { apiDelete, apiGet, apiPost, apiPut } from '@/libs/axios/apiMethods'

const ENDPOINTS = {
  CARTS: '/carts',
  GUEST_CARTS: '/carts/guest',
  GUEST_PURCHASE: '/ordersGuest',
  GUEST_PURCHASE_INSTANT: '/ordersGuest/instant',
  ORDERS_CHECKOUT: `/orders/checkout`,
}

const KEY = 'guestCart'

export const guestCartService = {
  deleteCloseItem: (productId: number) => {
    const localCartItems = getCartItem(KEY)
    if (localCartItems) {
      const parsedItems = JSON.parse(localCartItems)
      const updatedItems = parsedItems.filter((item: ProductDetail) => item.id !== productId)
      saveCartItem(KEY, JSON.stringify(updatedItems))
    }
    return productId
  },
}

/**
 * 로그인 사용자 장바구니 목록 조회
 */
export const fetchUserCartItemList = async (): Promise<CartType[]> => {
  const endpoint = createEndpoint(ENDPOINTS.CARTS)

  try {
    const response = await apiGet<CartType[]>(endpoint)

    return response.data
  } catch (error) {
    console.error(
      '사용자 장바구니 조회 실패:',
      error instanceof Error ? error.message : '알 수 없는 오류',
    )
    return []
  }
}

/**
 * 비로그인 사용자 장바구니 목록 조회
 * @param productIds 상품 ID 목록
 */
export const fetchGuestCartItemList = async (
  productIds: cartStorageType[],
): Promise<CartType[]> => {
  try {
    const queryParam = `saleProductId=${JSON.stringify(productIds)}`
    const endpoint = createEndpoint(`${ENDPOINTS.GUEST_CARTS}?${queryParam}`)
    const response = await apiGet<CartType[]>(endpoint)
    return response.data
  } catch (error) {
    console.error(
      '비회원 장바구니 조회 실패:',
      error instanceof Error ? error.message : '알 수 없는 오류',
    )
    return []
  }
}

/**
 * 장바구니에 상품 추가 (로그인 사용자)
 * @param productId 상품 ID
 * @param quantity 수량
 */
export const addProductCart = async (productId: number, quantity: number) => {
  const endpoint = createEndpoint(ENDPOINTS.CARTS)
  try {
    const response = await apiPost<CartDetailResponse>(endpoint, {
      saleProductId: productId,
      quantity: quantity,
    })

    return response.data
  } catch (error) {
    console.error(
      '장바구니 상품 추가 실패:',
      error instanceof Error ? error.message : '알 수 없는 오류',
    )
    return []
  }
}

/**
 * 장바구니 상품 삭제 (로그인 사용자)
 * @param selectedItems 삭제할 장바구니 아이템 ID 목록
 */
export const deleteCartItem = async (selectedItems: string[]) => {
  try {
    const endpoint = createEndpoint(ENDPOINTS.CARTS)
    const response = await apiDelete(endpoint, {
      data: { cartIdList: selectedItems },
    })
    return response.status
  } catch (error) {
    console.error(
      '장바구니 상품 삭제 실패:',
      error instanceof Error ? error.message : '알 수 없는 오류',
    )
    return []
  }
}

/**
 * 장바구니 상품 수량 변경 (로그인 사용자)
 * @param quantity 변경할 수량
 * @param cartId 장바구니 아이템 ID
 */
export const cartQuantity = async (productNum: number, cartId: string | undefined) => {
  try {
    const endpoint = createEndpoint(ENDPOINTS.CARTS)

    const response = await apiPut<CartDetailResponse>(endpoint, {
      cartId: cartId,
      quantity: productNum,
    })
    return response.data
  } catch (error) {
    console.error(
      '장바구니 수량 변경 실패:',
      error instanceof Error ? error.message : '알 수 없는 오류',
    )
    return { data: null, status: 500, success: false, message: '수량 변경 실패' }
  }
}

//상품이 여러개 일 때 비회원 주문 페이지에서 구매하기 클릭
export const guestPurchase = async (address: PurchasePageData, getGuestCart: cartStorageType[]) => {
  try {
    const endpoint = createEndpoint(ENDPOINTS.GUEST_PURCHASE)

    const response = await apiPost(endpoint, {
      address: {
        recipient: address.deliveryName || address.name,
        phone: address.deliveryPhone,
        address: address.address,
        detailAddress: address.userDetailAddress,
        zonecode: address.code,
        defaultYN: false,
      },
      orderDetailRequestList: getGuestCart,
    })
    return await response.data
  } catch (error) {
    console.error(error)
  }
}

//단품 비회원 주문 페이지에서 구매하기 클릭
export const guestOnePurchase = async (
  address: PurchasePageData,
  getGuestCart: cartStorageType[],
) => {
  try {
    const endpoint = createEndpoint(ENDPOINTS.GUEST_PURCHASE_INSTANT)

    const response = await apiPost(endpoint, {
      address: {
        recipient: address.deliveryName || address.name,
        phone: address.deliveryPhone,
        address: address.address,
        detailAddress: address.userDetailAddress,
        zonecode: address.code,
        defaultYN: false,
      },
      getGuestCart,
    })
    return await response.data
  } catch (error) {
    console.error(error)
  }
}

//비회원 장바구니 -> 주문서
export const guestPurchaseOrders = async (getGuestCart: cartStorageType[]) => {
  try {
    const endpoint = createEndpoint(ENDPOINTS.ORDERS_CHECKOUT)

    const transformedCart = getGuestCart.map(({ id, quantity }) => ({
      saleProductId: id,
      quantity,
    }))

    const response = await apiPost(endpoint, {
      transformedCart,
    })
    return response.data
  } catch (error) {
    console.error(error)
  }
}
