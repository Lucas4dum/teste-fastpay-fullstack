'use client'

import { useEffect, useState } from 'react'

interface IProps {
  children: React.ReactNode
}

export const SecureRouter = ({ children }: IProps) => {
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
    if (token === null) {
      if (typeof window !== 'undefined') {
        console.log('No token found, redirecting...')
        localStorage.clear()
        sessionStorage.clear()
        window.location.href = '/'
      }
    } else {
      setIsLoading(false)
    }
  }, [token])

  if (isLoading) {
    return null
  }

  return <>{children}</>
}
