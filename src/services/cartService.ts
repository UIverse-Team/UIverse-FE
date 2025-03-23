import { Product } from '@/types/Product/productType'
import { getCartItem, saveCartItem } from '@/util/cartStorage'
import HttpClient from '@/util/httpClient'

const KEY = 'guestCart'

export const memberCartService = {
  deleteItem: async (productId: number) => {
    await HttpClient.patch(`/carts/${productId}`)
    return productId
  },
}

export const guestCartService = {
  deleteCloseItem: (productId: number) => {
    const localCartItems = getCartItem(KEY)
    if (localCartItems) {
      const parsedItems = JSON.parse(localCartItems)
      const updatedItems = parsedItems.filter((item: Product) => item.id !== productId)
      saveCartItem(KEY, JSON.stringify(updatedItems))
    }
    return productId
  },
}
