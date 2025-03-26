import { create } from 'zustand'

interface ProductState {
  productId: number | null
  quantity: number
  setProductId: (productId: number) => void
  setQuantity: (quantity: number) => void
}

export const productStore = create<ProductState>((set) => ({
  productId: null,
  quantity: 1,
  setProductId: (productId) => set({ productId }),
  setQuantity: (quantity) => set({ quantity }),
}))
