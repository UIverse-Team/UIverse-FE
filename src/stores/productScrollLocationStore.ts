import { create } from 'zustand'

interface ProductState {
  scroll: 'description' | 'review' | 'chat'
  setScroll: (scroll: 'description' | 'review' | 'chat') => void
}

export const productScrollLocationStore = create<ProductState>((set) => ({
  scroll: 'description',
  setScroll: (scroll) => set({ scroll }),
}))
