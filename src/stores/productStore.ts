import { create } from 'zustand'

interface ProductOptionValue {
  color: string
  size: string
}

interface ProductState {
  productId: number | null
  products: Record<string, number> // 수량
  productsOption: Record<string, ProductOptionValue> // 색상 + 사이즈

  setProductId: (productId: number) => void
  setQuantity: (id: string, quantity: number) => void
  getQuantity: (id: string) => number

  setProductsOption: (id: string, color: string, size: string) => void
  getProductOption: (id: string) => ProductOptionValue | undefined
}

export const productStore = create<ProductState>((set, get) => ({
  productId: null,
  products: {},
  productsOption: {},

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

  setProductsOption: (id, color, size) =>
    set((state) => ({
      productsOption: {
        ...state.productsOption,
        [id]: { color, size },
      },
    })),

  getProductOption: (id) => {
    const state = get()
    return state.productsOption[id]
  },
}))
