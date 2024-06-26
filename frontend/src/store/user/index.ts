import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface UserState {
  user: {
    email: string
    access_token: string
  }
  signUp: () => void
  signIn: (user: Partial<UserState['user']>) => void
  signOut: () => void
}

export const useUser = create(
  persist<UserState>(
    (set, get) => ({
      user: {
        email: '',
        access_token: '',
      },
      signUp: () => {
        set({
          user: {
            email: '',
            access_token: '',
          },
        })
      },
      signIn: (user) => {
        if (user?.access_token) {
          localStorage.setItem('token', user.access_token)
        }

        set({
          user: {
            ...get().user,
            ...user,
          },
        })
      },
      signOut: () => {
        localStorage.clear()
        sessionStorage.clear()
        set({
          user: {
            email: '',
            access_token: '',
          },
        })
        window.location.reload()
      },
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage), // Usar localStorage
    },
  ),
)
