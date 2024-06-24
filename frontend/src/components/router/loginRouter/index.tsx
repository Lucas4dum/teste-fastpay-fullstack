'use client'

import { useEffect, useState } from 'react'

interface IProps {
  children: React.ReactNode
}

export const LoginRouter = ({ children }: IProps) => {
  const [isLoading, setIsLoading] = useState(true)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('token')
      console.log('Retrieved token from localStorage:', storedToken)
      setToken(storedToken)
    }
  }, [])

  useEffect(() => {
    if (token) {
      console.log('Token found, redirecting to dashboard...')
      window.location.href = '/dashboard'
    } else {
      setIsLoading(false)
    }
  }, [token])

  if (isLoading) {
    return null
  }

  return <>{children}</>
}
