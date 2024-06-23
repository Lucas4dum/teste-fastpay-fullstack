import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

interface IUser {
  user: {
    email: string
    access_token: string
  }
  singUp: () => void
  singIn: (user: Partial<IUser["user"]>) => void
}

export const useUser = create(
  persist<IUser>(
    (set, get) => ({
      user: {
        email: "",
        access_token: "",
      },
      singUp: () => {
        set({
          user: {
            email: "",
            access_token: "",
          },
        })
      },
      singIn: (user) => {
        set({
          user: {
            ...get().user,
            ...user,
          },
        })
      },
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)
