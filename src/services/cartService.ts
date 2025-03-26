import { ProductDetail } from '@/types/Product/productDetailType'
import { cartStorageType } from '@/types/cart/cartType'
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
    const response = await httpClient.get(`/api/carts`)
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
      `/api/carts/guest?saleProductId=${JSON.stringify(productIds)}`,
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
    const response = await httpClient.post(`/api/carts`, {
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
    const response = await httpClient.delete(`/api/carts`, {
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
    const response = await httpClient.put(`/api/carts`, {
      cartId: cartId,
      quantity: productNum,
    })
    return await response.data
  } catch (error) {
    console.error(error)
  }
}
