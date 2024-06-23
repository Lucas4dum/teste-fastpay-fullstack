"use client"
import { useState } from "react"
import Link from "next/link"
import { AxiosError } from "axios"
import { api } from "~/lib/axios"

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  async function handleSignIn(event: React.FormEvent) {
    event.preventDefault()
    setError("") // Limpa qualquer erro anterior
    try {
      const response = await api.post(`/session`, { email, password })
      console.log("Login bem-sucedido:", response.data)
      // Redirecionar para outra página após login bem-sucedido, por exemplo, a página inicial
      window.location.href = "/dashboard"
    } catch (error) {
      if (
        error instanceof AxiosError &&
        error.response &&
        error.response.status === 401
      ) {
        setError("E-mail ou senha incorretos. Verifique e tente novamente.")
      } else {
        console.error("Erro no login:", error)
      }
    }
  }

  return (
    <div className="bg-primary flex h-screen w-full items-center justify-center px-4">
      <div className="flex w-full max-w-md flex-col items-center justify-center gap-8">
        <img
          src="/logo_fastpay.svg"
          alt="Fastpay Logo"
          className="h-32 w-32 lg:h-40 lg:w-40"
        />
        <h1 className="text-center text-lg font-bold text-white lg:text-2xl">
          Gerencie suas transações com facilidade!
        </h1>

        <form
          className="bg-secondary flex w-full flex-col gap-4 rounded-lg p-5 lg:p-8"
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
              className="bg-input rounded-lg p-2 text-white"
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
              className="bg-input rounded-lg p-2 text-white"
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
            className="bg-button mt-4 w-full rounded-lg p-2 font-bold text-white lg:text-lg"
          >
            Login
          </button>
        </form>
        <Link href="/signup" className="mt-4 text-sm text-white lg:text-base">
          Criar conta
        </Link>
      </div>
    </div>
  )
}
