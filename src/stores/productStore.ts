import { create } from 'zustand'

interface ProductOptionValue {
  id: string
  color: string
  size: string
}

interface ProductState {
  productId: number | null
  products: Record<string, number> // 수량
  productOptions: ProductOptionValue[] // 변경: 배열로 여러 상품 옵션 저장

  setProductId: (productId: number) => void
  setQuantity: (id: string, quantity: number) => void
  getQuantity: (id: string) => number

  // 새로운 메서드: 상품 옵션 추가
  addProductOption: (id: string, color: string, size: string) => void
  // 새로운 메서드: 상품 옵션 업데이트
  updateProductOption: (id: string, color: string, size: string) => void
  // 새로운 메서드: 상품 옵션 제거
  removeProductOption: (id: string) => void
  // 새로운 메서드: 모든 상품 옵션 가져오기
  getAllProductOptions: () => ProductOptionValue[]
  // 새로운 메서드: 특정 ID의 상품 옵션 가져오기
  getProductOption: (id: string) => ProductOptionValue | undefined
}

export const productStore = create<ProductState>((set, get) => ({
  productId: null,
  products: {},
  productOptions: [],

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

  // 새로운 메서드: 상품 옵션 추가
  addProductOption: (id, color, size) =>
    set((state) => {
      // 이미 존재하는 ID인지 확인
      const existingOptionIndex = state.productOptions.findIndex((option) => option.id === id)

      // 이미 존재하면 업데이트, 없으면 추가
      if (existingOptionIndex >= 0) {
        const updatedOptions = [...state.productOptions]
        updatedOptions[existingOptionIndex] = { id, color, size }
        return { productOptions: updatedOptions }
      } else {
        return {
          productOptions: [...state.productOptions, { id, color, size }],
        }
      }
    }),

  // 기존 메서드 수정: 상품 옵션 업데이트
  updateProductOption: (id, color, size) =>
    set((state) => {
      const optionIndex = state.productOptions.findIndex((option) => option.id === id)

      if (optionIndex >= 0) {
        const updatedOptions = [...state.productOptions]
        updatedOptions[optionIndex] = {
          ...updatedOptions[optionIndex],
          color: color || updatedOptions[optionIndex].color,
          size: size || updatedOptions[optionIndex].size,
        }
        return { productOptions: updatedOptions }
      }
      return state
    }),

  // 새로운 메서드: 상품 옵션 제거
  removeProductOption: (id) =>
    set((state) => ({
      productOptions: state.productOptions.filter((option) => option.id !== id),
    })),

  // 새로운 메서드: 모든 상품 옵션 가져오기
  getAllProductOptions: () => {
    const state = get()
    return state.productOptions
  },

  // 기존 메서드 수정: 특정 ID의 상품 옵션 가져오기
  getProductOption: (id) => {
    const state = get()
    return state.productOptions.find((option) => option.id === id)
  },
}))
