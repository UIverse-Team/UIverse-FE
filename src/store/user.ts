import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  isLoggedIn: boolean
  userName: string | null
  login: (username: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      userName: null,
      login: (username: string) => set({ isLoggedIn: true, userName: username }),
      logout: () => set({ isLoggedIn: false, userName: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        userName: state.userName,
      }),
      skipHydration: true,
    },
  ),
)
