import { ProductDetail } from '@/types/Product/productDetailType'
import { cartStorageType } from '@/types/cart/cartType'
import { getCartItem, saveCartItem } from '@/util/cartStorage'
import httpClient from '@/util/httpClient'

const KEY = 'guestCart'

export const memberCartService = {
  deleteItem: async (productId: number) => {
    await httpClient.patch(`/carts/${productId}`)
    return productId
  },
}

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

export const fetchUserCartItemList = async () => {
  try {
    const response = await httpClient.get(`http://localhost:3000/api/carts`)
    return response.data
  } catch (error) {
    console.error('Failed to fetch user cart items:', error)
    return []
  }
}

export const fetchGuestCartItemList = async (productIds: cartStorageType[]) => {
  try {
    const response = await httpClient.get(
      `${process.env.SERVER_API_V1_BASE_URL}carts/guest?saleProductId=${JSON.stringify(productIds)}`,
    )
    return response.data
  } catch (error) {
    console.error('Failed to fetch guest cart items:', error)
    return []
  }
}
