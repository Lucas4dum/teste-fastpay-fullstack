import React from 'react'

interface IProps {
  title: string
  value: number
  icon: React.ReactNode
  bgColor?: string // Nova propriedade para a cor de fundo
}

const CurrencyFormatter = ({ value }: { value: number }) => {
  const formattedValue = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)

  return <>{formattedValue}</>
}

export const Card: React.FC<IProps> = ({ icon, title, value, bgColor }) => {
  return (
    <div
      className={`flex w-full flex-1 flex-col gap-4 rounded-lg px-4 py-6 text-white ${bgColor || 'bg-card'}`}
    >
      <div className="flex w-full flex-row items-center justify-between text-sm">
        <p>{title}</p>
        {icon}
      </div>
      <div className="flex items-center text-2xl font-bold">
        {CurrencyFormatter({ value: value || 0 })}
      </div>
    </div>
  )
}
