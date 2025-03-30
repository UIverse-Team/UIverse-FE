import { ProductDetail } from '@/types/Product/productDetailType'
import { cartStorageType } from '@/types/cart/cartType'
import { PurchasePageData } from '@/types/purchase/purchaseType'
import { getCartItem, saveCartItem } from '@/util/cartStorage'
import httpClient from '@/util/httpClient'

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
// api router
export const fetchUserCartItemList = async () => {
  try {
    const response = await httpClient.get(`/carts`)
    return response.data
  } catch (error) {
    console.error('Failed to fetch user cart items:', error)
    return []
  }
}

// api router
export const fetchGuestCartItemList = async (productIds: cartStorageType[]) => {
  try {
    const response = await httpClient.get(
      `/carts/guest?saleProductId=${JSON.stringify(productIds)}`,
    )
    return response.data
  } catch (error) {
    console.error('Failed to fetch guest cart items:', error)
    return []
  }
}

// 상품 상세에서 장바구니 등록
export const addProdcutCart = async (productId: number, quantity: number) => {
  try {
    const response = await httpClient.post(`/carts`, {
      saleProductId: productId,
      quantity: quantity,
    })
    return response.data
  } catch (error) {
    console.error('Failed to fetch guest cart items:', error)
    return []
  }
}

//cart 상품 삭제
export const deleteCartItem = async (selectedItems: string[]) => {
  try {
    const response = await httpClient.delete(`/carts`, {
      data: { cartIdList: selectedItems },
    })
    return response.status
  } catch (error) {
    console.error('Failed to fetch guest cart items:', error)
    return []
  }
}

// 상품 수량 api
export const cartQuantity = async (productNum: number, cartId: string | undefined) => {
  try {
    const response = await httpClient.put(`/carts`, {
      cartId: cartId,
      quantity: productNum,
    })
    return await response.data
  } catch (error) {
    console.error(error)
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

//비회원 장바구니 -> 주문서
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
