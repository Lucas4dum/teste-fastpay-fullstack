"use client"
import { useState } from "react"
import Link from "next/link"
import { AxiosError } from "axios"
import { api } from "~/lib/axios"
import { useRouter } from "next/navigation"
import AuthForm from "../../../components/AuthForm"
import { useUser } from "~/store/user"

export default function Signup() {
  const { singIn } = useUser()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  function validatePassword(password: string): string | null {
    const minLength = 6
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumber = /[0-9]/.test(password)

    if (password.length < minLength) {
      return "A senha deve ter no mínimo 6 caracteres."
    }

    if (!hasUpperCase || !hasLowerCase || !hasNumber) {
      return "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula e  um número."
    }

    return null
  }

  async function handleSignup(event: React.FormEvent) {
    event.preventDefault()
    setError("")

    const passwordError = validatePassword(password)
    if (passwordError) {
      setError(passwordError)
      return
    }

    try {
      const response = await api.post(`/user`, { email, password })
      console.log("Conta criada com sucesso:", response.data)

      // Realiza o login automático após criar a conta
      singIn({
        email: email,
        access_token: response.data.access_token,
      })

      // Redireciona para a página de dashboard
      router.push("/dashboard")
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        if (error.response.status === 409) {
          setError("Usuário já existe. Tente fazer login.")
        } else if (error.response.status === 400) {
          setError(
            "Não foi possível criar a conta. Verifique os dados e tente novamente.",
          )
        }
      } else {
        console.error("Erro ao criar conta:", error)
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
          Crie sua conta no Fastpay!
        </h1>
        <div className="mx-4 flex w-full flex-col px-10">
          <AuthForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            error={error}
            handleSubmit={handleSignup}
            submitButtonText="Criar conta"
          />
        </div>
        <Link href="/" className="mt-4 text-sm text-white lg:text-base">
          Já tem uma conta? Faça login
        </Link>
      </div>
    </div>
  )
}
