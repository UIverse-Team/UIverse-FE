import { create } from 'zustand'

interface ProductState {
  productId: number | null
  products: Record<string, number> // Maps productId to quantity
  setProductId: (productId: number) => void
  setQuantity: (id: string, quantity: number) => void
  getQuantity: (id: string) => number
}

export const productStore = create<ProductState>((set, get) => ({
  productId: null,
  products: {},

  setProductId: (productId) => set({ productId }),

  setQuantity: (id, quantity) =>
    set((state) => ({
      products: {
        ...state.products,
        [id]: quantity,
      },
    })),

  getQuantity: (id) => {
    const state = get()
    return state.products[id] || 1
  },
}))
