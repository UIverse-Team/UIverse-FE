import { cartStorageType, CartType, cartUserPurchaseOrderType } from '@/types/cart/cartType'
import { PurchasePageData, purchaseType } from '@/types/purchase/purchaseType'
import { createEndpoint } from '@/libs/axios/endPoints'
import { apiGet, apiPost } from '@/libs/axios/apiMethods'
import { Order } from '@/types/orders/orderType'

const ENDPOINTS = {
  CARTS: '/carts',
  GUEST_CARTS: '/carts/guest',
  GUEST_PURCHASE: '/ordersGuest',
  GUEST_PURCHASE_INSTANT: '/ordersGuest/instant',
  CHECKOUT_INSTANT: '/orders/checkoutInstant',
  ORDERS_CHECKOUT: `/orders/checkout`,
  ORDERS: `/orders`,
  PURCHASE_INSTANT: '/orders/instant',
  ADRESSS_DEFAULT_ADRESS: '/address/default-address',
  ADD_ADRESS: '/address/add',
}

//상품상세페이지에서 바로구매 클릭
//user 정보에 따라서 회원 비회원 구분
export async function getPurchaseService(productId: number, quantity: number) {
  const endpoint = createEndpoint(ENDPOINTS.CHECKOUT_INSTANT)
  try {
    const response = await apiGet<CartType>(
      `${endpoint}?saleProductId=${productId}&quantity=${quantity}`,
    )
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}

//상품이 여러개 일 때 비회원 주문 페이지에서 구매하기 클릭
export const guestPurchase = async (address: PurchasePageData, getGuestCart: cartStorageType[]) => {
  const endpoint = createEndpoint(ENDPOINTS.GUEST_PURCHASE)
  try {
    const response = await apiPost<Order>(endpoint, {
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
//회원 상태에 따라 처리
export const guestOnePurchase = async (
  address: PurchasePageData,
  getGuestCart: cartStorageType[],
) => {
  const endpoint = createEndpoint(ENDPOINTS.GUEST_PURCHASE_INSTANT)

  try {
    const response = await apiPost<Order>(endpoint, {
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
    return response.data
  } catch (error) {
    console.error(error)
  }
}

//단품 회원 주문 페이지에서 구매하기 클릭
export const userOnePurchase = async (
  address: purchaseType,
  saleProductId: number,
  quantity: number,
) => {
  const endpoint = createEndpoint(ENDPOINTS.PURCHASE_INSTANT)

  try {
    const response = await apiPost<purchaseType>(endpoint, {
      address: {
        recipient: address.recipient,
        phone: address.phone,
        address: address.address,
        detailAddress: address.detailAddress,
        zonecode: address.zonecode,
        defaultYN: address.defaultYN,
      },
      saleProductId: saleProductId,
      quantity: quantity,
    })
    return response.data
  } catch (error) {
    console.error(error)
  }
}

//비회원 장바구니 -> 주문서
//회원 장바구니 -> 주문서
//유저 상태에 따른 주문서 발급
export const purchaseOrders = async (
  getGuestCart: cartStorageType[],
  isLoggedIn: boolean,
  orderItems?: cartUserPurchaseOrderType[],
) => {
  const endpoint = createEndpoint(ENDPOINTS.ORDERS_CHECKOUT)

  try {
    if (isLoggedIn) {
      const response = await apiPost<CartType>(endpoint, { orderItems, isLoggedIn })
      return response.data
    } else {
      const transformedCart = getGuestCart.map(({ id, quantity }) => ({
        saleProductId: id,
        quantity,
      }))

      const response = await apiPost<CartType>(endpoint, {
        transformedCart,
      })
      return response.data
    }
  } catch (error) {
    console.error(error)
    return null
  }
}

//상품이 여러개 일 때 회원 주문 페이지에서 구매하기 클릭
export const userPurchase = async (address: purchaseType, cartItems: CartType) => {
  const endpoint = createEndpoint(ENDPOINTS.ORDERS)
  try {
    const response = await apiPost<Order>(endpoint, {
      address: {
        recipient: address.recipient,
        phone: address.phone,
        address: address.address,
        detailAddress: address.detailAddress,
        zonecode: address.zonecode,
        defaultYN: address.defaultYN,
      },
      orderDetailRequestList: cartItems.cartDetailResponseList.map((item) => ({
        saleProductId: item.saleProductId, // 상품 ID
        quantity: item.quantity, // 수량
        cartId: item.cartId,
      })),
    })
    return response.data
  } catch (error) {
    console.error(error)
  }
}

//회원 주소 있는지 여부 판단
export const defaultUserAddress = async (): Promise<purchaseType | null> => {
  const endpoint = createEndpoint(ENDPOINTS.ADRESSS_DEFAULT_ADRESS)
  try {
    const response = await apiGet<purchaseType>(endpoint)
    return response.data
  } catch (error) {
    console.error(error)
    return null
  }
}

// 주소 추가
export const addAddress = async (address: purchaseType) => {
  const endpoint = createEndpoint(ENDPOINTS.ADD_ADRESS)
  try {
    const response = await apiPost<purchaseType>(endpoint, { address })
    return response.data
  } catch (error) {
    console.error(error)
    return null
  }
}
