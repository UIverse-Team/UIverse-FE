import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  name: string
}

interface UserStore {
  user: User | null
  setUser: (userData: User | null) => void
}

export const userStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null, // 초기값을 null로 설정
      setUser: (userData: User | null) => set({ user: userData }), // user를 User 타입 또는 null로 설정
    }),
    {
      name: 'user-store',
    },
  ),
)
