import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  isLoggedIn: boolean
  userName: string | null
  tokenExpiry: number | null // 토큰 만료 시간 (타임스탬프)
  login: (username: string, expiryTime: number | null) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      userName: null,
      tokenExpiry: null,
      login: (username: string, expiryTime = null) =>
        set({ isLoggedIn: true, userName: username, tokenExpiry: expiryTime }),
      logout: () => set({ isLoggedIn: false, userName: null, tokenExpiry: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        userName: state.userName,
        tokenExpiry: state.tokenExpiry,
      }),
    },
  ),
)
