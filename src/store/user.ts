import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  name: string
}

interface UserStore {
  user: User | null
  setUser: (userData: User | null) => void
  validateToken: () => Promise<boolean>
  checkLoginStatus: () => Promise<void>
}

export const userStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (userData: User | null) => set({ user: userData }),
      validateToken: async () => {
        try {
          // 클라이언트 사이드에서 쿠키 확인
          const accessToken = document.cookie
            .split('; ')
            .find((row) => row.startsWith('accessToken='))
            ?.split('=')[1]

          if (!accessToken) return false
          return true
        } catch (error) {
          console.error('Token validation failed:', error)
          return false
        }
      },
      checkLoginStatus: async () => {
        const isTokenValid = await get().validateToken()

        if (!isTokenValid) {
          set({ user: null })
        }
      },
    }),
    {
      name: 'user-store',
    },
  ),
)
