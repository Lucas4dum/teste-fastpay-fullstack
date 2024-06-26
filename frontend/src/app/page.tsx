'use client'
import { AxiosError } from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { api } from '~/libs/axios'
import { useUser } from '~/store/user'

export default function SignIn() {
  const { signIn } = useUser()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function handleSignIn(event: React.FormEvent) {
    event.preventDefault()
    setError('')

    try {
      const response = await api.post(`/session`, { email, password })
      const token = response.data.access_token

      signIn({
        email,
        access_token: token,
      })

      router.push('/dashboard')
    } catch (error) {
      if (
        error instanceof AxiosError &&
        error.response &&
        error.response.status === 401
      ) {
        setError('E-mail ou senha incorretos. Verifique e tente novamente.')
      } else {
        console.error('Erro no login:', error)
      }
    }
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-primary px-4">
      <div className="flex w-full max-w-lg flex-col items-center justify-center gap-8">
        <img
          src="/logo_fastpay.svg"
          alt="Fastpay Logo"
          className="h-32 w-32 lg:h-40 lg:w-40"
        />
        <h1 className="text-center text-lg font-bold text-white lg:text-2xl">
          Gerencie suas transações com facilidade!
        </h1>

        <div className="mx-4 flex w-full flex-col px-10">
          <form
            className="flex w-full flex-col gap-4 rounded-lg bg-secondary p-5 lg:p-8"
            onSubmit={handleSignIn}
          >
            <div className="flex flex-col gap-1">
              <label
                className="text-sm text-[#939393] lg:text-base"
                htmlFor="email"
              >
                E-mail
              </label>
              <input
                id="email"
                className="rounded-lg bg-input p-2 text-white"
                type="email"
                placeholder="exemplo@hotmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                className="text-sm text-[#939393] lg:text-base"
                htmlFor="password"
              >
                Senha
              </label>
              <input
                id="password"
                className="rounded-lg bg-input p-2 text-white"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              className="mt-4 w-full rounded-lg bg-button p-2 font-bold text-white lg:text-lg"
            >
              Login
            </button>
          </form>
        </div>

        <Link href="/signup" className="mt-4 text-sm text-white lg:text-base">
          Criar conta
        </Link>
      </div>
    </div>
  )
}
