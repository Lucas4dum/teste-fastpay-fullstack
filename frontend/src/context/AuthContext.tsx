'use client'
import { useRouter } from 'next/navigation'
import React, { createContext, ReactNode, useState } from 'react'

import { api } from '~/libs/axios'
import { useUser } from '~/store/user'

interface IAuth {
  email: string
  password: string
}

interface IResponse {
  status: number
  message?: string
}

interface AuthContextDataProps {
  loading: boolean
  isAuthenticated: () => boolean
  handleSignIn: (props: IAuth) => Promise<IResponse>
}

interface AuthContextProviderProps {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps,
)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const { signIn, user } = useUser()
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  function isAuthenticated(): boolean {
    return !!user.access_token
  }

  async function handleSignIn({ email, password }: IAuth): Promise<IResponse> {
    setLoading(true)

    const response = await api
      .post('/session', {
        email,
        password,
      })
      .then((response) => {
        router.push('/dashboard')

        signIn({
          email,
          access_token: response.data.access_token,
        })

        return { status: 200 }
      })
      .catch((error) => {
        return { status: error.response.status, message: error.code }
      })
      .finally(() => {
        setLoading(false)
      })

    return response
  }

  return (
    <AuthContext.Provider
      value={{
        loading,
        isAuthenticated,
        handleSignIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
