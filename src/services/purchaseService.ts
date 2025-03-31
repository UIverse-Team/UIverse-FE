import { cartStorageType } from '@/types/cart/cartType'
import { PurchasePageData } from '@/types/purchase/purchaseType'
import httpClient from '@/util/httpClient'

//주문 상세페이지에서 바로구매 클릭
//user 정보에 따라서 회원 비회원 구분
export async function postPurchaseService() {
  try {
    const response = await httpClient.post(`/orderGuest/instant`)
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}

//상품이 여러개 일 때 비회원 주문 페이지에서 구매하기 클릭
export const guestPurchase = async (address: PurchasePageData, getGuestCart: cartStorageType[]) => {
  try {
    const response = await httpClient.post(`/ordersGuest`, {
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
    const response = await httpClient.post(`/ordersGuest/instant`, {
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

//단품 회원 주문 페이지에서 구매하기 클릭
export const userOnePurchase = async (address: PurchasePageData) => {
  try {
    const response = await httpClient.post(`/orders/instant`, {
      address: {
        recipient: address.deliveryName || address.name,
        phone: address.deliveryPhone,
        address: address.address,
        detailAddress: address.userDetailAddress,
        zonecode: address.code,
        defaultYN: false,
      },
    })
    return await response.data
  } catch (error) {
    console.error(error)
  }
}

//비회원 장바구니 -> 주문서
//회원 장바구니 -> 주문서
//유저 상태에 따른 주문서 발급
export const guestPurchaseOrders = async (getGuestCart: cartStorageType[]) => {
  try {
    const transformedCart = getGuestCart.map(({ id, quantity }) => ({
      saleProductId: id,
      quantity,
    }))

    const response = await httpClient.post(`/orders/checkout`, {
      transformedCart,
    })
    return response.data
  } catch (error) {
    console.error(error)
  }
}

//상품이 여러개 일 때 회원 주문 페이지에서 구매하기 클릭
export const userPurchase = async (address: PurchasePageData) => {
  try {
    const response = await httpClient.post(`/orders`, {
      address: {
        recipient: address.deliveryName || address.name,
        phone: address.deliveryPhone,
        address: address.address,
        detailAddress: address.userDetailAddress,
        zonecode: address.code,
        defaultYN: false,
      },
    })
    return await response.data
  } catch (error) {
    console.error(error)
  }
}
