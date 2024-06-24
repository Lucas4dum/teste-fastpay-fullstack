import React, { FormEvent } from 'react'

import ErrorMessage from './ErrorMessage'
import InputField from './InputField'

type AuthFormProps = {
  email: string
  setEmail: (value: string) => void
  password: string
  setPassword: (value: string) => void
  error: string
  handleSubmit: (e: FormEvent) => void
  submitButtonText?: string
}

function AuthForm({
  email,
  setEmail,
  password,
  setPassword,
  error,
  handleSubmit,
  submitButtonText = 'Login',
}: AuthFormProps) {
  return (
    <form
      className="flex w-full flex-col gap-4 rounded-lg bg-secondary p-5 lg:p-8"
      onSubmit={handleSubmit}
    >
      <InputField
        id="email"
        label="E-mail"
        type="email"
        placeholder="exemplo@hotmail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputField
        id="password"
        label="Senha"
        type="password"
        placeholder="********"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <ErrorMessage message={error} />}
      <button
        type="submit"
        className="mt-4 w-full rounded-lg bg-button p-2 font-bold text-white lg:text-lg"
      >
        {submitButtonText}
      </button>
    </form>
  )
}

export default AuthForm
